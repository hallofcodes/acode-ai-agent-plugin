import { OpenRouter } from '@openrouter/sdk'
import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools as ollamaTools } from '../tools/ollama_tools'
import { Usage, StreamChunk, ChatMessage } from '../types'
import { OutputFunctionCallItem } from '@openrouter/sdk/esm/models'

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
	const chat_messages: any[] = messages
		.map(m => ({
			role: m.role,
			content: m.content
		}))

	const responseTools = ollamaTools.map(tool => ({
		type: 'function' as const,
		name: tool.function.name,
		description: tool.function.description,
		parameters: tool.function.parameters,
	}))

	let fullText = ''
	let resolvedModel = model
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	while (true) {
		if (signal?.aborted) break

		// Map of call_id → accumulated partial tool call
		const pendingToolCalls: Record<string, OutputFunctionCallItem> = {}

		const response = await client.beta.responses.send(
			{
				responsesRequest: {
					model,
					temperature: aiSettings.temperature,
					maxOutputTokens: aiSettings.maxTokens,
					parallelToolCalls: true,
					tools: responseTools,
					toolChoice: 'auto',
					input: chat_messages,
					instructions: aiSettings.systemInstruction,
					stream: true
				},
			},
			{ signal }
		)

		for await (const chunk of response) {
			if (signal?.aborted) break

			switch (chunk.type) {
				case 'response.output_text.delta':

					fullText += chunk.delta
					yield { type: 'text', delta: chunk.delta, model: resolvedModel }
					break

				// A new output item started — capture id and call_id for function_calls
				case 'response.output_item.added':
					const item = chunk.item

					if (item.type === 'function_call' && item.id) {
						pendingToolCalls[item.id] = item
					}
					break

				case 'response.function_call_arguments.done':

					if (pendingToolCalls[chunk.itemId] ?? null) {
						pendingToolCalls[chunk.itemId].arguments = chunk.arguments
					}
					break

				case 'response.completed':
					// chunk.response.usage has token counts
					usage.inputTokens += chunk.response.usage?.inputTokens ?? 0,
					usage.outputTokens += chunk.response.usage?.outputTokens ?? 0,
					usage.totalTokens += chunk.response.usage?.totalTokens ?? 0,

					// chunk.response.model has the resolved model name
					resolvedModel = chunk.response.model || model
					break
			}
		}


		// No tool calls → we're done
		if (Object.entries(pendingToolCalls).length === 0) break

		// Push all function_call items into history (assistant's side)
		for (const tcId in pendingToolCalls) {
			const tc = pendingToolCalls[tcId]

			chat_messages.push(tc)

			try {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${tc.name}`)
				).default

				const args = safeJson(tc.arguments)
				const chunkedResult = toolFunction(args)

				for await (const toolChunk of chunkedResult) {
					if (toolChunk.toSave) {
						yield {
							type: 'tool',
							delta: toolChunk.toSave,
							model: resolvedModel
						}
					}

					if (toolChunk.result) {
						chat_messages.push({
							type: 'function_call_output',
							id: tc.callId,
							callId: tc.callId,
							output: toolChunk.result,
						})

						break
					}
				}
			} catch (e: any) {
				const errorMessage = e instanceof Error ? e.message : 'Unknown error'
				clg(errorMessage)

				chat_messages.push({
					type: 'function_call_output',
					id: tc.callId,
					callId: tc.callId,
					output: '[ERROR] ' + errorMessage
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


function safeJson(text: string) {
	try {
		const output = JSON.parse(text)
		return output
	} catch {
		return {}
	}
}
