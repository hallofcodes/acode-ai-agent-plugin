const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const vm = require('node:vm')
const ts = require('typescript')

const providerPath = path.join(__dirname, '../src/chats/providers/ollama.ts')
const compiled = ts.transpileModule(readFileSync(providerPath, 'utf8'), {
	fileName: providerPath,
	compilerOptions: {
		module: ts.ModuleKind.CommonJS,
		target: ts.ScriptTarget.ES2022,
		esModuleInterop: true
	},
	reportDiagnostics: true
})
assert.equal(
	compiled.diagnostics?.filter(item => item.category === ts.DiagnosticCategory.Error).length,
	0,
	'The provider must transpile before testing its behavior'
)

const textRecords = [
	{ model: 'synthetic-model', message: { content: 'Hello' } },
	{ model: 'synthetic-model', message: { content: ' world' } },
	{ model: 'synthetic-model', done: true, prompt_eval_count: 2, eval_count: 3 }
]

for (const withSignal of [false, true]) {
	test('streams text and usage ' + (withSignal ? 'with an active signal' : 'with the signal argument omitted'), async () => {
		const signal = withSignal ? new AbortController().signal : undefined
		const { events, requests } = await runProvider([textRecords], { signal })
		assert.equal(events.filter(event => event.type === 'text').map(event => event.delta).join(''), 'Hello world')
		assert.equal(events.at(-1).type, 'done')
		assert.equal(events.at(-1).text, 'Hello world')
		assert.equal(events.at(-1).usage.totalTokens, 5)
		assert.equal(requests.length, 1)
	})
}

test('executes tool calls and reads the follow-up response with the signal argument omitted', async () => {
	const call = {
		id: 'synthetic-call',
		function: { name: 'synthetic_tool', arguments: { value: 'synthetic input' } }
	}
	const { events, requests, argumentsSeen } = await runProvider([
		[{ message: { content: 'Checking', tool_calls: [call] }, done: true }],
		[{ message: { content: ' Done' }, done: true, prompt_eval_count: 2, eval_count: 3 }]
	])
	assert.deepEqual(argumentsSeen, ['synthetic input'])
	assert.equal(requests.length, 2)
	assert.deepEqual(events.filter(event => event.type === 'tool').map(event => event.delta), ['Synthetic tool output'])
	assert.equal(events.at(-1).text, 'Checking Done')
	assert.equal(events.at(-1).usage.totalTokens, 5)
	const messages = requests[1].messages
	assert.equal(messages[1].role, 'assistant')
	assert.equal(messages[1].tool_calls[0].id, 'synthetic-call')
	assert.equal(messages[2].role, 'tool')
	assert.equal(messages[2].content, 'Synthetic tool result')
})

test('still stops before reading the next chunk when a supplied signal is aborted', async () => {
	const abort = new AbortController()
	const { events, requests, argumentsSeen } = await runProvider([textRecords], {
		signal: abort.signal,
		onEvent(event) {
			if (event.type === 'text') abort.abort()
		}
	})
	assert.deepEqual(events.filter(event => event.type === 'text').map(event => event.delta), ['Hello'])
	assert.equal(events.at(-1).type, 'done')
	assert.equal(events.at(-1).text, 'Hello')
	assert.equal(requests.length, 1)
	assert.deepEqual(argumentsSeen, [])
})

async function runProvider(responseRecords, { signal, onEvent } = {}) {
	const requests = []
	const argumentsSeen = []
	const responses = responseRecords.map(records => new Response(new ReadableStream({
		start(controller) {
			for (const record of records) {
				controller.enqueue(new TextEncoder().encode(JSON.stringify(record) + '\n'))
			}
			controller.close()
		}
	})))
	const settings = {
		ollamaHost: 'http://ollama.invalid',
		apiKeys: {},
		temperature: 0,
		maxTokens: 16,
		systemInstruction: 'Synthetic optional-signal test'
	}
	const exported = { exports: {} }
	vm.runInNewContext(compiled.outputText, {
		module: exported,
		exports: exported.exports,
		TextDecoder,
		Error,
		require(id) {
			if (id === '../settings') return { aiSettings: settings }
			if (id === '../tools/ollama_tools') return { tools: [] }
			if (id === '../tools/functions/synthetic_tool') return {
				async *default(args) {
					argumentsSeen.push(args.value)
					yield { toSave: 'Synthetic tool output', result: 'Synthetic tool result' }
				}
			}
			throw new Error('Unexpected test dependency: ' + id)
		},
		async fetch(url, init) {
			assert.equal(url, 'http://ollama.invalid/api/chat')
			assert.equal(init.signal, signal)
			requests.push(JSON.parse(init.body))
			if (signal?.aborted) throw new DOMException('Synthetic abort', 'AbortError')
			assert.ok(requests.length <= responses.length, 'Unexpected additional model request')
			return responses[requests.length - 1]
		}
	}, { filename: providerPath })
	const events = []
	const stream = signal === undefined
		? exported.exports.default('synthetic-model', [])
		: exported.exports.default('synthetic-model', [], signal)
	for await (const event of stream) {
		events.push(event)
		onEvent?.(event)
	}
	for (const response of responses) {
		assert.equal(response.body.locked, false, 'The provider must release its stream reader')
	}
	return { events, requests, argumentsSeen }
}
