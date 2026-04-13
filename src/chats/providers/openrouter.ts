import { OpenRouter } from '@openrouter/sdk'
import { aiSettings } from '../settings'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// OpenRouter  (official @openrouter/sdk)
// ─────────────────────────────────────────────

async function* streamOpenRouter(
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const client = new OpenRouter({
		apiKey: aiSettings.apiKeys.openrouter,
		httpReferer: aiSettings.openRouterSiteUrl || undefined,
		appTitle: aiSettings.openRouterSiteName || undefined
	})

	const stream = await client.chat.send(
		{
			chatRequest: {
				model,
				temperature: aiSettings.temperature,
				maxCompletionTokens: aiSettings.maxTokens,
				stream: true,
				messages: [
					{ role: 'system', content: aiSettings.systemInstruction },
					...messages.map(m => ({ role: m.role, content: m.content }))
				]
			}
		},
		{ signal }
	)

	let fullText = ''
	let resolvedModel = model
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	for await (const chunk of stream) {
		if (signal?.aborted) break

		if (chunk.error) {
			throw new Error(chunk.error.message)
		}

		resolvedModel = chunk.model ?? resolvedModel

		const delta = chunk.choices[0]?.delta?.content ?? ''
		if (delta) {
			fullText += delta
			yield { type: 'text', delta }
		}

		if (chunk.usage) {
			usage = {
				inputTokens: chunk.usage.promptTokens ?? 0,
				outputTokens: chunk.usage.completionTokens ?? 0,
				totalTokens: chunk.usage.totalTokens ?? 0
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

export default streamOpenRouter
