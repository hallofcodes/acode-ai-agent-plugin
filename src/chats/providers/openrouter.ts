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
	const chat_messages: any[] = messages
		.map(m => ({
			role: m.role,
			content: m.content
		}))

	chat_messages.unshift({
		role: 'system',
		content: aiSettings.systemInstruction
	})

	const responseTools = ollamaTools.map(tool => ({
		type: 'function' as const,
		function: {
			name: tool.function.name,
			description: tool.function.description,
			parameters: tool.function.parameters,
			strict: null
		}
	}))

	let fullText = ''
	let resolvedModel = model
	let toolCalls
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	while (true) {
		if (signal?.aborted) break

		const response = await client.chat.send(
			{
				chatRequest: {
					model,
					temperature: aiSettings.temperature,
					maxCompletionTokens: aiSettings.maxTokens,
					parallelToolCalls: true,
					tools: responseTools,
					stream: true,
					toolChoice: 'auto',
					messages: chat_messages
				},
			},
			{ signal }
		)

		for await (const chunk of response) {
			// Full type information for streaming responses
			const content = chunk.choices[0]?.delta?.content;
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
