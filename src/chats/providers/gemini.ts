import { GoogleGenAI } from '@google/genai'
import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools as ollamaTools } from '../tools/ollama_tools'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Gemini
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const ai = new GoogleGenAI({ apiKey: aiSettings.apiKeys.gemini })

	// Mirror Ollama flow: incoming messages are plain history; tool state is built
	// only inside this provider execution loop.
	const turnMessages: ChatMessage[] = messages.map(m => ({
		role: m.role,
		content: m.content
	}))

	const contents: any[] = turnMessages
		.filter(m => m.role === 'user' || m.role === 'assistant')
		.map(m => {
			if (m.role === 'assistant') {
				// Keep historical assistant turns as text-only. Function call parts from
				// prior turns can carry thought signatures that are not available here.
				return { role: 'model', parts: [{ text: m.content || '' }] }
			}

			return { role: 'user', parts: [{ text: m.content }] }
		})

	const functionDeclarations = ollamaTools.map(tool => ({
		name: tool.function.name,
		description: tool.function.description,
		parameters: tool.function.parameters
	}))

	const config: any = {
		systemInstruction: aiSettings.systemInstruction,
		temperature: aiSettings.temperature,
		maxOutputTokens: aiSettings.maxTokens,
		tools: [{ functionDeclarations }]
	}

	let fullText = ''
	let chunk: any = null
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	while (true) {
		if (signal?.aborted) break

		const stream = await ai.models.generateContentStream({
			model,
			contents,
			config
		})

		const toolCalls: any[] = []
		const seenToolCallIds = new Set<string>()
		let turnText = ''
		let lastModelContent: any = null

		for await (chunk of stream) {
			if (signal?.aborted) break

			const candidateContent = (chunk as any)?.candidates?.[0]?.content
			if (candidateContent?.parts?.length) {
				lastModelContent = candidateContent
			}

			const functionCalls = (chunk as any).functionCalls as any[] | undefined
			if (functionCalls?.length) {
				for (const call of functionCalls) {
					const id =
						call?.id ??
						`${call?.name}:${JSON.stringify(call?.args ?? {})}`
					if (seenToolCallIds.has(id)) continue
					seenToolCallIds.add(id)
					toolCalls.push(call)
				}
			}

			const delta = chunk.text ?? ''
			if (delta) {
				turnText += delta
				fullText += delta
				yield { type: 'text', delta, model: chunk.modelVersion || model }
			}

			const meta = (
				chunk as unknown as {
					usageMetadata?: {
						promptTokenCount?: number
						candidatesTokenCount?: number
						totalTokenCount?: number
					}
				}
			).usageMetadata

			if (meta) {
				usage = {
					inputTokens: meta.promptTokenCount ?? 0,
					outputTokens: meta.candidatesTokenCount ?? 0,
					totalTokens: meta.totalTokenCount ?? 0
				}
			}
		}

		if (!toolCalls.length) break

		turnMessages.push({
			role: 'assistant',
			content: turnText,
			tool_calls: toolCalls
		})

		// Reuse the model-emitted content so functionCall thought signatures are preserved.
		if (lastModelContent?.parts?.length) {
			contents.push(lastModelContent)
		} else {
			const fallbackParts: any[] = []
			if (turnText) fallbackParts.push({ text: turnText })
			for (const call of toolCalls) {
				fallbackParts.push({
					functionCall: {
						id: call.id,
						name: call.name,
						args: call.args ?? {}
					}
				})
			}

			contents.push({
				role: 'model',
				parts: fallbackParts.length ? fallbackParts : [{ text: '' }]
			})
		}

		const functionResponses: any[] = []

		for (const call of toolCalls) {
			if (!call?.name) continue

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${call.name}`)
				).default

				const args = call.args ?? {}
				const chunkedResult = toolFunction(args)

				let resultContent = ''

				for await (const toolChunk of chunkedResult) {
					if (toolChunk.toSave) {
						yield {
							type: 'tool',
							delta: toolChunk.toSave,
							model: chunk.modelVersion || model
						}
					}

					if (toolChunk.result) {
						resultContent = toolChunk.result
						break
					}
				}

				functionResponses.push({
					id: call.id,
					name: call.name,
					response: { result: resultContent || '[NO RESULT]' }
				})

				turnMessages.push({
					role: 'tool',
					tool_name: call.name,
					content: resultContent || '[NO RESULT]'
				})
			} catch (e: any) {
				const errorMessage =
					e instanceof Error ? e.message : 'Unknown error'
				clg(errorMessage)

				functionResponses.push({
					id: call.id,
					name: call.name,
					response: { result: `[ERROR] ${errorMessage}` }
				})

				turnMessages.push({
					role: 'tool',
					tool_name: call.name,
					content: `[ERROR] ${errorMessage}`
				})
			}
		}

		contents.push({
			role: 'user',
			parts: functionResponses.map(functionResponse => ({
				functionResponse
			}))
		})
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'gemini',
		model: chunk.modelVersion || model,
		usage
	}
}
