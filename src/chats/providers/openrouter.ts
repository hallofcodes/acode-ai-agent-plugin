import { OpenRouter, ToolType } from '@openrouter/sdk'
import { z } from 'zod'
import { aiSettings } from '../settings'
import { ToolsFunction } from '../tools/functions/types'
import { tools as ollamaTools } from '../tools/ollama_tools'
import { Usage, StreamChunk, ChatMessage } from '../types'
import { createInputSchemaFromJsonSchema } from './utils/jsonSchemaToZod'

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

	const input = messages.map(message => ({
		type: 'message' as const,
		role: message.role as 'user' | 'assistant' | 'system',
		content: message.content
	}))

	const responseTools = createCallModelTools()

	let fullText = ''
	let resolvedModel = model
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	const result = client.callModel(
		{
			model,
			instructions: aiSettings.systemInstruction,
			temperature: aiSettings.temperature,
			maxOutputTokens: aiSettings.maxTokens,
			parallelToolCalls: true,
			toolChoice: 'auto',
			input,
			tools: responseTools
		},
		{ signal }
	)

	for await (const event of result.getFullResponsesStream()) {
		if (signal?.aborted) break

		if (event.type === 'response.output_text.delta') {
			fullText += event.delta
			yield { type: 'text', model: resolvedModel, delta: event.delta }
		}

		if (event.type === 'tool.preliminary_result') {
			if (hasToolSaveText(event.result)) {
				yield {
					type: 'tool',
					delta: event.result.toSave,
					model: resolvedModel
				}
			}
		}
	}

	const response = await result.getResponse()
	resolvedModel = response.model || resolvedModel

	if (response.usage) {
		usage = {
			inputTokens: response.usage.inputTokens ?? 0,
			outputTokens: response.usage.outputTokens ?? 0,
			totalTokens: response.usage.totalTokens ?? 0
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

function createCallModelTools() {
	const eventSchema = z.object({ toSave: z.string() })
	const outputSchema = z.object({ result: z.string() })

	return ollamaTools.map(toolDef => ({
		type: ToolType.Function,
		function: {
			name: toolDef.function.name,
			description: toolDef.function.description,
			inputSchema: createInputSchemaFromJsonSchema(toolDef.function.parameters),
			eventSchema,
			outputSchema,
			execute: async function* (params: Record<string, unknown>) {
				const toolFunction: ToolsFunction = (
					await require(`../tools/functions/${toolDef.function.name}`)
				).default

				const chunkedResult = toolFunction(params as Parameters<ToolsFunction>[0])
				let resultText = '[NO RESULT]'

				for await (const toolChunk of chunkedResult) {
					if (toolChunk.toSave) {
						yield { toSave: toolChunk.toSave }
					}

					if (toolChunk.result) {
						resultText = toolChunk.result
						break
					}
				}

				return { result: resultText }
			}
		}
	}))
}

function hasToolSaveText(value: unknown): value is { toSave: string } {
	if (!value || typeof value !== 'object') return false

	const maybeValue = value as { toSave?: unknown }
	return typeof maybeValue.toSave === 'string' && maybeValue.toSave.length > 0
}
