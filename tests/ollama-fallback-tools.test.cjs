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

function encodeRecords(items, newline = true) {
	return new TextEncoder().encode(items.map(item => JSON.stringify(item)).join('\n') + (newline ? '\n' : ''))
}

async function runProvider(parts, { followups = [], tool, onEvent } = {}) {
	const abort = new AbortController()
	const requests = []
	const responses = [parts, ...followups].map(chunks => new Response(
		new ReadableStream({
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
			return responses[requests.length - 1]
		}
	}, { filename: providerPath })

	const events = []
	for await (const event of module.exports.default('synthetic-model', [], abort.signal)) {
		events.push(event)
		onEvent?.(event, abort)
	}
	assert.equal(requests.length, responses.length)
	return { events, requests }
}

test('dispatches tool call when model sends raw JSON in content (Issue #6)', async () => {
	const rawJson = JSON.stringify({
		name: 'synthetic_tool',
		arguments: { message: 'hello from raw json' }
	})
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: rawJson }, done: true }
	])
	const followup = encodeRecords([
		{ model: 'synthetic-model', message: { content: 'Tool execution complete' }, done: true }
	])

	const argsSeen = []
	const { events, requests } = await runProvider([first], {
		followups: [[followup]],
		tool: async function* (args) {
			argsSeen.push(args.message)
			yield { toSave: 'Saved result' }
			yield { result: 'OK from tool' }
		}
	})

	assert.deepEqual(argsSeen, ['hello from raw json'])
	assert.equal(requests.length, 2)
	assert.equal(requests[1].body.messages.at(-1).role, 'tool')
	assert.equal(requests[1].body.messages.at(-1).content, 'OK from tool')
	assert.ok(events.some(e => e.type === 'tool' && e.delta === 'Saved result'))
	assert.equal(events.at(-1).type, 'done')
})

test('dispatches tool call when model wraps JSON in markdown code fences', async () => {
	const markdown = 'I will run the tool:\n```json\n{\n  "name": "synthetic_tool",\n  "arguments": {\n    "message": "inside markdown"\n  }\n}\n```'
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: markdown }, done: true }
	])
	const followup = encodeRecords([
		{ model: 'synthetic-model', message: { content: 'Finished' }, done: true }
	])

	const argsSeen = []
	const { events, requests } = await runProvider([first], {
		followups: [[followup]],
		tool: async function* (args) {
			argsSeen.push(args.message)
			yield { toSave: 'Markdown tool output' }
			yield { result: 'Success' }
		}
	})

	assert.deepEqual(argsSeen, ['inside markdown'])
	assert.equal(requests.length, 2)
	assert.ok(events.some(e => e.type === 'tool' && e.delta === 'Markdown tool output'))
})

test('dispatches tool call when model emits nested function object format', async () => {
	const nested = JSON.stringify({
		function: {
			name: 'synthetic_tool',
			arguments: { message: 'nested format' }
		}
	})
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: nested }, done: true }
	])
	const followup = encodeRecords([
		{ model: 'synthetic-model', message: { content: 'Done' }, done: true }
	])

	const argsSeen = []
	const { requests } = await runProvider([first], {
		followups: [[followup]],
		tool: async function* (args) {
			argsSeen.push(args.message)
			yield { toSave: 'output' }
			yield { result: 'result' }
		}
	})

	assert.deepEqual(argsSeen, ['nested format'])
	assert.equal(requests.length, 2)
})

test('ignores non-tool JSON or unregistered tool names without dispatching', async () => {
	const regularJson = JSON.stringify({ name: 'unknown_function', arguments: { foo: 'bar' } })
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: regularJson }, done: true }
	])

	let toolCalled = false
	const { events, requests } = await runProvider([first], {
		tool: async function* () {
			toolCalled = true
		}
	})

	assert.equal(toolCalled, false)
	assert.equal(requests.length, 1)
	assert.equal(events.at(-1).type, 'done')
})

test('does not dispatch fallback tool call if cancelled after receiving raw JSON', async () => {
	const rawJson = JSON.stringify({
		name: 'synthetic_tool',
		arguments: { message: 'cancel me' }
	})
	const first = encodeRecords([
		{ model: 'synthetic-model', message: { content: rawJson }, done: true }
	])

	let toolCalled = false
	const { requests } = await runProvider([first], {
		onEvent(event, abort) {
			if (event.type === 'text') abort.abort()
		},
		tool: async function* () {
			toolCalled = true
		}
	})

	assert.equal(toolCalled, false)
	assert.equal(requests.length, 1)
})

