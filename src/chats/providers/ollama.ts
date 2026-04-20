import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools } from '../tools/ollama_tools'
import { StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Ollama
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const host =
		aiSettings.ollamaHost?.replace(/\/$/, '') || 'http://127.0.0.1:11434'

	const headers: Record<string, string> = {}
	if (aiSettings.apiKeys.ollama?.length) {
		headers['Authorization'] = `Bearer ${aiSettings.apiKeys.ollama}`
	}

	let fullText = ''
	let chunk: any = null

	const chat_messages = [...messages]

	while (true) {
		const body = JSON.stringify({
			model,
			stream: true,
			messages: [
				{ role: 'system', content: aiSettings.systemInstruction },
				...chat_messages.map(m => ({
					role: m.role,
					content: m.content,
					tool_calls: m.tool_calls,
					tool_name: m.tool_name
				}))
			],
			options: {
				temperature: aiSettings.temperature,
				num_predict: aiSettings.maxTokens
			},
			tools
		})

		let response: Response
		try {
			response = await fetch(`${host}/api/chat`, {
				method: 'POST',
				headers,
				body,
				signal
			})
		} catch (err: any) {
			if (err.name === 'AbortError') break

			throw new Error(
				`Failed to connect to Ollama at ${host}. ${
					err?.message ?? 'Network error — check CORS or host.'
				}`
			)
		}

		if (!response.ok) {
			const text = await response.text().catch(() => '')
			throw new Error(`Ollama responded ${response.status}: ${text}`)
		}

		const reader = response.body?.getReader()
		if (!reader) throw new Error('No response body from Ollama')

		const decoder = new TextDecoder()
		const toolCalls: any[] = []
		const seenToolCallIds = new Set()

		try {
			while (signal?.aborted === false) {
				const { done, value } = await reader.read()
				if (done) break

				const lines = decoder
					.decode(value, { stream: true })
					.split('\n')
					.filter(Boolean)

				for (const line of lines) {
					try {
						chunk = JSON.parse(line)

						if (chunk.message?.content) {
							fullText += chunk.message.content
							yield {
								type: 'text',
								delta: chunk.message.content,
								model: chunk.model ?? model
							}
						}

						if (chunk.message?.tool_calls?.length) {
							for (const tc of chunk.message.tool_calls) {
								const id = tc.id ?? JSON.stringify(tc)

								if (!seenToolCallIds.has(id)) {
									seenToolCallIds.add(id)
									toolCalls.push(tc)
								}
							}
						}
					} catch {
						// incomplete JSON line, skip
					}
				}
			}
		} finally {
			reader.releaseLock()
		}

		// --- Handle any tool calls at the end of the stream ---

		if (!toolCalls.length) {
			break
		}

		chat_messages.push({
			role: 'assistant',
			content: fullText,
			tool_calls: toolCalls
		})

		for (const call of toolCalls) {
			if (!call.function.name) continue

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${call.function.name}`)
				).default

				const chunkedResult = toolFunction(call.function.arguments)

				for await (const toolChunk of chunkedResult) {
					if (toolChunk.toSave) {
						yield {
							type: 'tool',
							delta: toolChunk.toSave,
							model: chunk?.model ?? model
						}
					}

					if (toolChunk.result) {
						chat_messages.push({
							role: 'tool',
							tool_name: call.function.name,
							content: toolChunk.result || '[NO RESULT]'
						})

						break
					}
				}
			} catch (e: any) {
				const errorMessage = e instanceof Error ? e.message : 'Unknown error'
				clg(errorMessage)

				chat_messages.push({
					role: 'tool',
					tool_name: call.function.name,
					content: '[ERROR] ' + errorMessage
				})
			}
		}
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'ollama',
		model: chunk?.model ?? model,
		usage: {
			inputTokens: chunk?.prompt_eval_count ?? 0,
			outputTokens: chunk?.eval_count ?? 0,
			totalTokens: (chunk?.prompt_eval_count ?? 0) + (chunk?.eval_count ?? 0)
		}
	}
}
