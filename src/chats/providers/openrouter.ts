import { OpenRouter } from '@openrouter/sdk'
import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools as ollamaTools } from '../tools/ollama_tools'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// OpenRouter  (official @openrouter/sdk)
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const client = new OpenRouter({
		apiKey: aiSettings.apiKeys.openrouter,
		httpReferer: aiSettings.openRouterSiteUrl || undefined,
		appTitle: aiSettings.openRouterSiteName || undefined
	})

	// Mirror the provider pattern used elsewhere: plain incoming history,
	// then provider-local tool loop with function_call_output continuations.
	const baseInput: any[] = messages
		.filter(m => m.role !== 'tool')
		.map(m => ({
			type: 'message',
			role: m.role,
			content: m.content
		}))

	const responseTools = ollamaTools.map(tool => ({
		type: 'function' as const,
		name: tool.function.name,
		description: tool.function.description,
		parameters: tool.function.parameters,
		strict: false
	}))

	let fullText = ''
	let resolvedModel = model
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
	let previousResponseId: string | undefined
	let nextInput: any[] = baseInput

	while (true) {
		if (signal?.aborted) break

		const response: any = await client.beta.responses.send(
			{
				responsesRequest: {
					model,
					instructions: aiSettings.systemInstruction,
					temperature: aiSettings.temperature,
					maxOutputTokens: aiSettings.maxTokens,
					stream: false,
					parallelToolCalls: false,
					tools: responseTools,
					input: nextInput,
					previousResponseId
				}
			},
			{ signal }
		)

		if (response?.error) {
			throw new Error(response.error?.message || 'OpenRouter response error')
		}

		resolvedModel = response?.model ?? resolvedModel
		previousResponseId = response?.id ?? previousResponseId

		const turnText = getResponseText(response)
		if (turnText) {
			fullText += turnText
			yield { type: 'text', model: resolvedModel, delta: turnText }
		}

		if (response?.usage) {
			usage = {
				inputTokens:
					response.usage.inputTokens ?? response.usage.input_tokens ?? 0,
				outputTokens:
					response.usage.outputTokens ?? response.usage.output_tokens ?? 0,
				totalTokens: response.usage.totalTokens ?? 0
			}
		}

		const toolCalls = Array.isArray(response?.output)
			? response.output.filter(
					(item: any) => item?.type === 'function_call' && item?.name
			  )
			: []

		if (!toolCalls.length) break

		nextInput = []

		for (const call of toolCalls) {
			const toolName = call?.name as string
			if (!toolName) continue
			const callId = call?.callId ?? call?.call_id

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${toolName}`)
				).default

				const args = safeJsonParse(call?.arguments ?? '{}')
				const chunkedResult = toolFunction(args as any)
				let resultContent = ''

				clg(`TOOL CALLED: [${toolName}]`, args)

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

				nextInput.push({
					type: 'function_call_output',
					id: createFunctionOutputId(callId),
					callId,
					output: resultContent || '[NO RESULT]'
				})
			} catch (e: any) {
				const errorMessage =
					e instanceof Error ? e.message : 'Unknown error'
				clg(errorMessage)

				nextInput.push({
					type: 'function_call_output',
					id: createFunctionOutputId(callId),
					callId,
					output: `[ERROR] ${errorMessage}`
				})
			}
		}
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'openrouter',
		model: resolvedModel,
		usage
	}
}

function getResponseText(response: any): string {
	if (response?.outputText) return response.outputText
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

function safeJsonParse(raw: string): Record<string, any> {
	try {
		return JSON.parse(raw)
	} catch {
		return {}
	}
}

function createFunctionOutputId(callId?: string): string {
	return `fco_${callId ?? 'unknown'}_${Date.now()}`
}
