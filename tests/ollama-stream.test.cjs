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

const records = [
	{ model: 'synthetic-model', message: { content: 'Hello' }, done: false },
	{ model: 'synthetic-model', message: { content: ' world' }, done: false },
	{ model: 'synthetic-model', done: true, prompt_eval_count: 3, eval_count: 2 }
]
const payload = encodeRecords(records)

test('preserves text when complete NDJSON records arrive together', async () => {
	const { events } = await runProvider([payload])
	assertAnswer(events, 'Hello world')
})

test('preserves the same text when a network chunk splits an NDJSON record', async () => {
	const cut = Buffer.from(payload).indexOf('Hello') + 2
	assert.ok(cut > 2 && cut < payload.length)
	const parts = [payload.slice(0, cut), payload.slice(cut)]
	assert.deepEqual(Buffer.concat(parts), Buffer.from(payload))

	const { events } = await runProvider(parts)
	assertAnswer(events, 'Hello world')
})

test('preserves records at every possible two-chunk byte boundary', async () => {
	for (let cut = 1; cut < payload.length; cut++) {
		const { events } = await runProvider([payload.slice(0, cut), payload.slice(cut)])
		assertAnswer(events, 'Hello world', `Split at byte ${cut}`)
	}
})

test('preserves UTF-8 text when each byte arrives in a separate chunk', async () => {
	const text = 'Bok, čćšžđ \u{1D11E}'
	const bytes = encodeRecords([
		{ model: 'synthetic-model', message: { content: text }, done: false },
		records[2]
	])
	const { events } = await runProvider(Array.from(bytes, byte => Uint8Array.of(byte)))
	assertAnswer(events, text)
})

test('preserves a complete final record without a trailing newline', async () => {
	const { events } = await runProvider([encodeRecords(records, false)])
	assertAnswer(events, 'Hello world')
})

test('ignores a truncated final record at EOF without losing earlier text', async () => {
	const bytes = Buffer.concat([
		encodeRecords([records[0]]),
		Buffer.from('{"message":{"content":"truncated')
	])
	const { events } = await runProvider([bytes])
	assert.equal(
		events.filter(event => event.type === 'text').map(event => event.delta).join(''),
		'Hello'
	)
	assert.equal(events.at(-1).text, 'Hello')
	assert.equal(events.at(-1).usage.totalTokens, 0)
})

test('handles an empty response body', async () => {
	const { events } = await runProvider([])
	assert.equal(events.length, 1)
	assert.equal(events[0].type, 'done')
	assert.equal(events[0].text, '')
	assert.equal(events[0].usage.totalTokens, 0)
})

test('flushes fragmented final usage and model metadata at EOF without a newline', async () => {
	const bytes = encodeRecords([
		...records.slice(0, 2),
		{ ...records[2], model: 'resolved-model' }
	], false)
	const cut = Buffer.from(bytes).indexOf('"eval_count"') + 6
	assert.ok(cut > 6 && cut < bytes.length)
	const { events } = await runProvider([bytes.slice(0, cut), bytes.slice(cut)])
	assertAnswer(events, 'Hello world')
	assert.equal(events.at(-1).model, 'resolved-model')
	assert.equal(events.at(-1).usage.inputTokens, 3)
	assert.equal(events.at(-1).usage.outputTokens, 2)
})

test('keeps CRLF, blank-line and malformed-record handling', async () => {
	const text = '\r\n \r\n' + JSON.stringify(records[0]) + '\r\nnot-json\r\n\r\n' +
		JSON.stringify(records[1]) + '\r\n' + JSON.stringify(records[2]) + '\r\n'
	const { events } = await runProvider([new TextEncoder().encode(text)])
	assertAnswer(events, 'Hello world')
})

test('preserves complete tool calls and the existing follow-up loop', async () => {
	await assertToolRoundTrip(false)
})

test('preserves fragmented tool calls, deduplicates them and reads the follow-up response', async () => {
	await assertToolRoundTrip(true)
})

async function assertToolRoundTrip(fragmented) {
	const call = {
		id: 'synthetic-call',
		function: { name: 'synthetic_tool', arguments: { message: 'test input' } }
	}
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: 'Checking' }, done: false },
		{ model: 'synthetic-model', message: { tool_calls: [call] }, done: false },
		{ model: 'synthetic-model', message: { tool_calls: [call] }, done: true }
	], false)
	const followup = encodeRecords([
		{ model: 'synthetic-model', message: { content: ' Done' }, done: false },
		records[2]
	], false)
	const argumentsSeen = []
	const { events, requests } = await runProvider(
		fragmented ? Array.from(first, byte => Uint8Array.of(byte)) : [first],
		{
			followups: [[followup]],
			tool: async function* (args) {
				argumentsSeen.push(args.message)
				yield { toSave: 'Synthetic tool output' }
				yield { result: 'Synthetic tool result' }
			}
		}
	)
	assert.deepEqual(argumentsSeen, ['test input'])
	assertAnswer(events, 'Checking Done')
	assert.deepEqual(
		events.filter(event => event.type === 'tool').map(event => event.delta),
		['Synthetic tool output']
	)
	assert.equal(requests[0].body.tools[0].function.name, 'synthetic_tool')
	const sent = requests[1].body.messages
	assert.equal(sent[1].role, 'assistant')
	assert.equal(sent[1].tool_calls.length, 1)
	assert.equal(sent[1].tool_calls[0].id, 'synthetic-call')
	assert.equal(sent[2].role, 'tool')
	assert.equal(sent[2].content, 'Synthetic tool result')
}

test('does not flush an unterminated record when cancelled before observing EOF', async () => {
	const bytes = encodeRecords([records[0], records[1]], false)
	const { events } = await runProvider([bytes], {
		onEvent(event, abort) {
			if (event.type === 'text') abort.abort()
		}
	})
	assert.equal(
		events.filter(event => event.type === 'text').map(event => event.delta).join(''),
		'Hello'
	)
	assert.equal(events.at(-1).text, 'Hello')
})

test('does not flush buffered data if cancellation arrives during the EOF read', { timeout: 2000 }, async t => {
	const readingEOF = deferred()
	const releaseEOF = deferred()
	t.after(() => releaseEOF.resolve())
	let firstRead = true
	let abort
	const body = new ReadableStream({
		async pull(controller) {
			if (firstRead) {
				firstRead = false
				controller.enqueue(encodeRecords([records[0], records[1]], false))
			} else {
				readingEOF.resolve()
				await releaseEOF.promise
				controller.close()
			}
		}
	}, { highWaterMark: 0 })
	const result = runProvider([], {
		body,
		onEvent(event, controller) {
			abort = controller
		}
	})
	await readingEOF.promise
	abort.abort()
	releaseEOF.resolve()
	const { events } = await result
	assert.equal(
		events.filter(event => event.type === 'text').map(event => event.delta).join(''),
		'Hello'
	)
	assert.equal(events.at(-1).text, 'Hello')
})

function deferred() {
	let resolve
	const promise = new Promise(done => { resolve = done })
	return { promise, resolve }
}

function encodeRecords(items, newline = true) {
	return new TextEncoder().encode(items.map(item => JSON.stringify(item)).join('\n') + (newline ? '\n' : ''))
}

function assertAnswer(events, text, message) {
	assert.equal(
		events.filter(event => event.type === 'text').map(event => event.delta).join(''),
		text,
		message
	)
	assert.equal(events.at(-1).type, 'done', message)
	assert.equal(events.at(-1).text, text, message)
	assert.equal(events.at(-1).usage.totalTokens, 5, message)
}

async function runProvider(parts, { followups = [], tool, onEvent, body } = {}) {
	const abort = new AbortController()
	const requests = []
	const responses = [parts, ...followups].map((chunks, index) => new Response(
		index === 0 && body ? body : new ReadableStream({
			start(controller) {
				for (const part of chunks) controller.enqueue(part)
				controller.close()
			}
		})
	))
	const settings = {
		ollamaHost: 'http://ollama.invalid',
		apiKeys: {},
		systemInstruction: 'Synthetic test',
		temperature: 0,
		maxTokens: 16
	}
	const module = { exports: {} }
	vm.runInNewContext(compiled.outputText, {
		module,
		exports: module.exports,
		TextDecoder,
		require(specifier) {
			if (specifier === '../settings') return { aiSettings: settings }
			if (specifier === '../tools/ollama_tools') return {
				tools: tool ? [{
					type: 'function',
					function: {
						name: 'synthetic_tool',
						parameters: { type: 'object', properties: { message: { type: 'string' } } }
					}
				}] : []
			}
			if (specifier === '../tools/functions/synthetic_tool' && tool) return { default: tool }
			throw new Error(`Unexpected provider dependency or tool call: ${specifier}`)
		},
		async fetch(url, init) {
			requests.push({ url, body: JSON.parse(init.body) })
			assert.ok(requests.length <= responses.length, 'Unexpected extra request')
			assert.equal(url, 'http://ollama.invalid/api/chat')
			assert.equal(init.method, 'POST')
			assert.equal(init.signal, abort.signal)
			assert.equal(init.headers.Authorization, undefined)
			return responses[requests.length - 1]
		}
	}, { filename: providerPath })

	const events = []
	for await (const event of module.exports.default('synthetic-model', [], abort.signal)) {
		events.push(event)
		onEvent?.(event, abort)
	}
	assert.equal(requests.length, responses.length)
	for (const response of responses) {
		assert.equal(response.body.locked, false, 'The provider must release its stream reader')
	}
	return { events, requests }
}
