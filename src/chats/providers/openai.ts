import OpenAI from 'openai'
import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools as ollamaTools } from '../tools/ollama_tools'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// OpenAI
// Models: gpt-4o | gpt-4.1 | gpt-5.4 | o3 | o4-mini
// For coding agent tasks: gpt-5.3-codex | gpt-5.2-codex
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const client = new OpenAI({
		apiKey: aiSettings.apiKeys.openai,
		dangerouslyAllowBrowser: true
	})

	// Keep incoming history plain; tool state is built only inside this loop.
	const turnMessages: any[] = messages.map(m => ({ role: m.role, content: m.content }))
	const openaiTools = ollamaTools.map(tool => ({
		type: 'function' as const,
		function: {
			name: tool.function.name,
			description: tool.function.description,
			parameters: tool.function.parameters
		}
	}))

	let fullText = ''
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
	let resolvedModel = model

	while (true) {
		if (signal?.aborted) break

		const completion = await client.chat.completions.create(
			{
				model,
				temperature: aiSettings.temperature,
				max_tokens: aiSettings.maxTokens,
				tool_choice: 'auto',
				tools: openaiTools,
				messages: [
					{ role: 'system', content: aiSettings.systemInstruction },
					...turnMessages
				]
			},
			{ signal }
		)

		resolvedModel = completion.model ?? resolvedModel

		if (completion.usage) {
			usage = {
				inputTokens: completion.usage.prompt_tokens ?? 0,
				outputTokens: completion.usage.completion_tokens ?? 0,
				totalTokens: completion.usage.total_tokens ?? 0
			}
		}

		const assistantMessage = completion.choices[0]?.message
		const turnText = assistantMessage?.content ?? ''

		if (turnText) {
			fullText += turnText
			yield { type: 'text', model: resolvedModel, delta: turnText }
		}

		const toolCalls = assistantMessage?.tool_calls ?? []
		if (!toolCalls.length) break

		turnMessages.push({
			role: 'assistant',
			content: turnText,
			tool_calls: toolCalls
		})

		for (const call of toolCalls) {
			if (call?.type !== 'function') continue

			const toolName = call?.function?.name
			if (!toolName) continue

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${toolName}`)
				).default

				const rawArgs = call.function.arguments ?? '{}'
				const args = safeJsonParse(rawArgs)
				const chunkedResult = toolFunction(args as any)
				let resultContent = ''

				for await (const toolChunk of chunkedResult) {
					if (toolChunk.toSave) {
						yield {
							type: 'tool',
							delta: toolChunk.toSave,
							model: resolvedModel
						}
					}

					if (toolChunk.result) {
						resultContent = toolChunk.result
						break
					}
				}

				turnMessages.push({
					role: 'tool',
					tool_call_id: call.id,
					content: resultContent || '[NO RESULT]'
				})
			} catch (e: any) {
				const errorMessage = e instanceof Error ? e.message : 'Unknown error'
				clg(errorMessage)

				turnMessages.push({
					role: 'tool',
					tool_call_id: call.id,
					content: `[ERROR] ${errorMessage}`
				})
			}
		}
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'openai',
		model: resolvedModel,
		usage
	}
}

function safeJsonParse(raw: string): Record<string, any> {
	try {
		return JSON.parse(raw)
	} catch {
		return {}
	}
}
