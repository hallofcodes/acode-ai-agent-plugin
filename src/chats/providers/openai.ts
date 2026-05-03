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
	const config: any = {
		apiKey: aiSettings.apiKeys.openai,
		dangerouslyAllowBrowser: true
	}

	if (String(aiSettings.openaiHost).length > 0)
		config['baseURL'] = aiSettings.openaiHost

	const client = new OpenAI(config)

	// Keep incoming history plain; tool state is built only inside this loop.
	const input: any[] = messages
		.filter(m => m.role !== 'tool')
		.map(m => ({ role: m.role, content: m.content }))

	const openaiTools = ollamaTools.map(tool => ({
		type: 'function' as const,
		name: tool.function.name,
		description: tool.function.description,
		parameters: tool.function.parameters,
		strict: false
	}))

	let fullText = ''
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
	let resolvedModel = model

	while (true) {
		if (signal?.aborted) break

		const response: any = await client.responses.create(
			{
				model,
				instructions: aiSettings.systemInstruction,
				temperature: aiSettings.temperature,
				max_output_tokens: aiSettings.maxTokens,
				parallel_tool_calls: true,
				tool_choice: 'auto',
				tools: openaiTools,
				input
			},
			{ signal }
		)

		resolvedModel = response?.model ?? resolvedModel

		if (response?.usage) {
			usage = {
				inputTokens:
					response.usage.input_tokens ?? response.usage.prompt_tokens ?? 0,
				outputTokens:
					response.usage.output_tokens ??
					response.usage.completion_tokens ??
					0,
				totalTokens: response.usage.total_tokens ?? 0
			}
		}

		const turnText = getResponseText(response)

		if (turnText) {
			fullText += turnText
			yield { type: 'text', model: resolvedModel, delta: turnText }
		}

		const toolCalls = Array.isArray(response?.output)
			? response.output.filter(
					(item: any) => item?.type === 'function_call' && item?.name
				)
			: []

		if (!toolCalls.length) break

		// Preserve the model output items (including reasoning/function calls)
		// before appending function_call_output items.
		input.push(...response.output)

		for (const call of toolCalls) {
			const toolName = call?.name
			if (!toolName) continue

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${toolName}`)
				).default

				const rawArgs = call?.arguments ?? '{}'
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

				input.push({
					type: 'function_call_output',
					call_id: call.call_id,
					output: resultContent || '[NO RESULT]'
				})
			} catch (e: any) {
				const errorMessage =
					e instanceof Error ? e.message : String(e || 'Unknown error')

				input.push({
					type: 'function_call_output',
					call_id: call.call_id,
					output: `[ERROR] ${errorMessage}`
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

function getResponseText(response: any): string {
	if (response?.output_text) return response.output_text
	if (!Array.isArray(response?.output)) return ''

	let text = ''

	for (const item of response.output) {
		if (item?.type !== 'message' || !Array.isArray(item?.content)) continue

		for (const contentPart of item.content) {
			if (contentPart?.type === 'output_text' && contentPart?.text) {
				text += contentPart.text
			}
		}
	}

	return text
}
