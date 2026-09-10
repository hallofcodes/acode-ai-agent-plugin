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

test('does not fetch or dispatch tools with an already-aborted signal', async () => {
	const result = await runProvider({ preAborted: true })
	assert.equal(result.requests.length, 0)
	assert.deepEqual(result.started, [])
	assert.equal(result.events.at(-1).type, 'done')
})

test('does not dispatch tool calls from the same record after cancellation on text', async () => {
	const result = await runProvider({
		records: [{ message: { content: 'Before', tool_calls: [call('first')] } }],
		onEvent(event, abort) {
			if (event.type === 'text') abort.abort()
		}
	})
	assert.deepEqual(result.started, [])
	assert.equal(result.requests.length, 1)
	assert.equal(result.releases, 1)
	assert.equal(result.events.at(-1).text, 'Before')
})

test('stops processing later records in the same network chunk after cancellation', async () => {
	const result = await runProvider({
		records: [
			{ message: { content: 'Before' } },
			{ message: { content: 'After', tool_calls: [call('first')] } }
		],
		onEvent(event, abort) {
			if (event.type === 'text') abort.abort()
		}
	})
	assert.deepEqual(result.events.filter(event => event.type === 'text').map(event => event.delta), ['Before'])
	assert.deepEqual(result.started, [])
	assert.equal(result.requests.length, 1)
})

test('does not process a network chunk returned after cancellation during read', async () => {
	const result = await runProvider({
		onRead(request, read, abort) {
			if (request === 0 && read === 0) abort.abort()
		}
	})
	assert.deepEqual(result.started, [])
	assert.equal(result.requests.length, 1)
	assert.equal(result.releases, 1)
})

test('does not dispatch collected tool calls after cancellation during the EOF read', async () => {
	const result = await runProvider({
		onRead(request, read, abort) {
			if (request === 0 && read === 1) abort.abort()
		}
	})
	assert.deepEqual(result.started, [])
	assert.equal(result.requests.length, 1)
	assert.equal(result.releases, 1)
})

test('checks cancellation again after awaiting the tool module', async () => {
	const result = await runProvider({
		onLoadTool(name, abort) {
			abort.abort()
		}
	})
	assert.deepEqual(result.loaded, ['first'])
	assert.deepEqual(result.started, [])
	assert.equal(result.requests.length, 1)
})

test('closes a yielded tool iterator without advancing it or starting the next tool', async () => {
	let advanced = false
	let closed = false
	const result = await runProvider({
		async *tool() {
			try {
				yield { toSave: 'Before cancellation' }
				advanced = true
				yield { result: 'Unexpected continuation' }
			} finally {
				closed = true
			}
		},
		onEvent(event, abort) {
			if (event.type === 'tool') abort.abort()
		}
	})
	assert.equal(advanced, false)
	assert.equal(closed, true)
	assert.deepEqual(result.started, ['first'])
	assert.equal(result.requests.length, 1)
})

test('suppresses a tool chunk returned after cancellation while awaiting the tool', async () => {
	let advanced = false
	let closed = false
	const result = await runProvider({
		async *tool(name, args, abort) {
			try {
				await Promise.resolve()
				abort.abort()
				yield { toSave: 'Late output' }
				advanced = true
				yield { result: 'Unexpected continuation' }
			} finally {
				closed = true
			}
		}
	})
	assert.deepEqual(result.events.filter(event => event.type === 'tool'), [])
	assert.equal(advanced, false)
	assert.equal(closed, true)
	assert.deepEqual(result.started, ['first'])
	assert.equal(result.requests.length, 1)
})

test('preserves normal tool execution, output, results and the model follow-up', async () => {
	const result = await runProvider()
	assert.deepEqual(result.started, ['first', 'second'])
	assert.deepEqual(result.events.filter(event => event.type === 'tool').map(event => event.delta), ['first output', 'second output'])
	assert.equal(result.requests.length, 2)
	assert.equal(result.events.at(-1).text, 'Done')
	const messages = result.requests[1].messages
	assert.equal(messages[1].role, 'assistant')
	assert.equal(messages[1].tool_calls.length, 2)
	assert.deepEqual(messages.filter(message => message.role === 'tool').map(message => message.content), ['first result', 'second result'])
})

test('preserves tool-error handling and continues with the remaining tool when not cancelled', async () => {
	const result = await runProvider({
		async *tool(name) {
			if (name === 'first') throw new Error('Synthetic tool failure')
			yield { result: 'second result' }
		}
	})
	assert.deepEqual(result.started, ['first', 'second'])
	assert.equal(result.requests.length, 2)
	const messages = result.requests[1].messages.filter(message => message.role === 'tool')
	assert.equal(messages[0].content, '[ERROR] Synthetic tool failure')
	assert.equal(messages[1].content, 'second result')
	assert.equal(result.events.at(-1).text, 'Done')
})

function call(name) {
	return { id: name, function: { name, arguments: { value: name } } }
}

async function runProvider(options = {}) {
	const abort = new AbortController()
	if (options.preAborted) abort.abort()
	const requests = []
	const loaded = []
	const started = []
	const events = []
	let releases = 0
	const first = options.records ?? [{ message: { tool_calls: [call('first'), call('second')] }, done: true }]
	const responses = [first, [{ message: { content: 'Done' }, done: true }]]
	const settings = {
		ollamaHost: 'http://ollama.invalid',
		apiKeys: {},
		temperature: 0,
		maxTokens: 16,
		systemInstruction: 'Synthetic cancellation test'
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
			const name = id.match(/^\.\.\/tools\/functions\/(first|second)$/)?.[1]
			if (!name) throw new Error('Unexpected test dependency: ' + id)
			loaded.push(name)
			const toolModule = {
				default(args) {
					started.push(name)
					if (options.tool) return options.tool(name, args, abort)
					return (async function* () {
						yield { toSave: name + ' output', result: name + ' result' }
					})()
				}
			}
			if (options.onLoadTool) {
				return Promise.resolve(options.onLoadTool(name, abort)).then(() => toolModule)
			}
			return toolModule
		},
		async fetch(url, init) {
			assert.equal(url, 'http://ollama.invalid/api/chat')
			assert.equal(init.signal, abort.signal)
			const request = requests.length
			requests.push(JSON.parse(init.body))
			if (abort.signal.aborted) throw new DOMException('Synthetic abort', 'AbortError')
			assert.ok(request < responses.length, 'Unexpected additional model request')
			const bytes = new TextEncoder().encode(responses[request].map(record => JSON.stringify(record)).join('\n') + '\n')
			let read = 0
			return {
				ok: true,
				body: {
					getReader() {
						return {
							async read() {
								const index = read++
								options.onRead?.(request, index, abort)
								return index === 0 ? { done: false, value: bytes } : { done: true }
							},
							releaseLock() {
								releases++
							}
						}
					}
				}
			}
		}
	}, { filename: providerPath })
	for await (const event of exported.exports.default('synthetic-model', [], abort.signal)) {
		events.push(event)
		options.onEvent?.(event, abort)
	}
	return { requests, loaded, started, events, releases }
}
