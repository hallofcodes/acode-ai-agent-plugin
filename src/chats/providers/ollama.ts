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

	while (!signal?.aborted) {
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
		let pending = ''
		let currentTurnText = ''
		const toolCalls: any[] = []
		const seenToolCallIds = new Set()

		try {
			while (!signal?.aborted) {
				const { done, value } = await reader.read()
				if (signal?.aborted) break
				pending += done
					? decoder.decode()
					: decoder.decode(value, { stream: true })
				const lines = pending.split('\n')
				pending = done ? '' : lines.pop()!

				for (const line of lines.filter(Boolean)) {
					if (signal?.aborted) break
					try {
						chunk = JSON.parse(line)

						if (chunk.message?.content) {
							fullText += chunk.message.content
							currentTurnText += chunk.message.content
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
						// Ignore malformed records, including an incomplete final record.
					}
				}
				if (done) break
			}
		} finally {
			reader.releaseLock()
		}

		// --- Handle any tool calls at the end of the stream ---

		if (!toolCalls.length && !signal?.aborted) {
			const registeredTools = new Set(
				(tools || []).map((t: any) => t?.function?.name).filter(Boolean)
			)
			const fallbackCalls = extractFallbackToolCalls(
				currentTurnText,
				registeredTools
			)
			for (const fallback of fallbackCalls) {
				const id = fallback.id ?? JSON.stringify(fallback)
				if (!seenToolCallIds.has(id)) {
					seenToolCallIds.add(id)
					toolCalls.push(fallback)
				}
			}
		}

		if (signal?.aborted || !toolCalls.length) {
			break
		}

		chat_messages.push({
			role: 'assistant',
			content: fullText,
			tool_calls: toolCalls
		})

		for (const call of toolCalls) {
			if (signal?.aborted) break
			if (!call.function.name) continue

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${call.function.name}`)
				).default
				if (signal?.aborted) break

				const chunkedResult = toolFunction(call.function.arguments)

				for await (const toolChunk of chunkedResult) {
					if (signal?.aborted) break
					if (toolChunk.toSave) {
						yield {
							type: 'tool',
							delta: toolChunk.toSave,
							model: chunk?.model ?? model
						}
						if (signal?.aborted) break
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
				const errorMessage =
					e instanceof Error ? e.message : String(e || 'Unknown error')

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

function extractFallbackToolCalls(
	text: string,
	registeredTools: Set<string>
): any[] {
	if (!text || typeof text !== 'string' || registeredTools.size === 0) return []

	const found: any[] = []

	const tryAdd = (obj: any): boolean => {
		if (!obj || typeof obj !== 'object') return false
		if (Array.isArray(obj)) {
			let anyAdded = false
			for (const item of obj) {
				if (tryAdd(item)) anyAdded = true
			}
			return anyAdded
		}

		let name = ''
		let args: any = {}

		if (typeof obj.name === 'string' && registeredTools.has(obj.name)) {
			name = obj.name
			args = obj.arguments ?? {}
		} else if (
			typeof obj.function?.name === 'string' &&
			registeredTools.has(obj.function.name)
		) {
			name = obj.function.name
			args = obj.function.arguments ?? {}
		}

		if (name) {
			if (typeof args === 'string') {
				try {
					args = JSON.parse(args)
				} catch {
					args = {}
				}
			}
			found.push({
				id: `fallback_${name}_${found.length}`,
				type: 'function',
				function: {
					name,
					arguments: args && typeof args === 'object' ? args : {}
				}
			})
			return true
		}
		return false
	}

	const trimmed = text.trim()

	// 1. Try parsing whole text as JSON
	if (
		(trimmed.startsWith('{') && trimmed.endsWith('}')) ||
		(trimmed.startsWith('[') && trimmed.endsWith(']'))
	) {
		try {
			if (tryAdd(JSON.parse(trimmed))) return found
		} catch {}
	}

	// 2. Try parsing markdown code blocks: ```(?:json)? ... ```
	const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/gi
	let match: RegExpExecArray | null
	while ((match = codeBlockRegex.exec(text)) !== null) {
		const blockContent = match[1].trim()
		try {
			if (tryAdd(JSON.parse(blockContent))) return found
		} catch {}
	}

	// 3. Scan for JSON object candidates with balanced braces containing "name"
	let startIndex = -1
	let braceCount = 0
	for (let i = 0; i < text.length; i++) {
		if (text[i] === '{') {
			if (braceCount === 0) startIndex = i
			braceCount++
		} else if (text[i] === '}') {
			if (braceCount > 0) {
				braceCount--
				if (braceCount === 0 && startIndex !== -1) {
					const candidate = text.slice(startIndex, i + 1)
					if (candidate.includes('"name"')) {
						try {
							tryAdd(JSON.parse(candidate))
						} catch {}
					}
					startIndex = -1
				}
			}
		}
	}

	return found
}

