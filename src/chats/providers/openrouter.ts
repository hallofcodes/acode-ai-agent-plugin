import { aiSettings } from '../settings'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// OpenRouter  (OpenAI-compatible SSE, native fetch)
// ─────────────────────────────────────────────

async function* streamOpenRouter(
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	clg('Gotten.here')
	const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		signal,
		headers: {
			Authorization: `Bearer ${aiSettings.apiKeys.openrouter}`,
			'Content-Type': 'application/json',
			...(aiSettings.openRouterSiteUrl
				? { 'HTTP-Referer': aiSettings.openRouterSiteUrl }
				: {}),
			...(aiSettings.openRouterSiteName
				? { 'X-Title': aiSettings.openRouterSiteName }
				: {})
		},
		body: JSON.stringify({
			model,
			stream: true,
			temperature: aiSettings.temperature,
			max_tokens: aiSettings.maxTokens,
			messages: [
				{ role: 'system', content: aiSettings.systemInstruction },
				...messages.map(m => ({ role: m.role, content: m.content }))
			]
		})
	})

	if (!res.ok) {
		const err = await res.text()
		throw new Error(err)
	}

	const reader = res.body!.getReader()
	const decoder = new TextDecoder()
	let buffer = ''
	let fullText = ''
	let resolvedModel = model
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	while (!signal?.aborted) {
		const { done, value } = await reader.read()
		if (done) break

		buffer += decoder.decode(value, { stream: true })

		clg('Buffer', buffer)

		// SSE lines are separated by \n — process each complete line
		const lines = buffer.split('\n')
		buffer = lines.pop() ?? '' // last item may be incomplete — keep for next round

		for (const line of lines) {
			const trimmed = line.trim()
			if (!trimmed || trimmed === 'data: [DONE]') continue
			if (!trimmed.startsWith('data: ')) continue

			try {
				const json = JSON.parse(trimmed.slice(6)) as {
					model?: string
					choices: Array<{
						delta: { content?: string }
						finish_reason: string | null
					}>
					usage?: {
						prompt_tokens: number
						completion_tokens: number
						total_tokens: number
					}
				}

				resolvedModel = json.model ?? resolvedModel

				const delta = json.choices[0]?.delta?.content ?? ''
				if (delta) {
					fullText += delta
					yield { type: 'text', delta }
				}

				if (json.usage) {
					usage = {
						inputTokens: json.usage.prompt_tokens ?? 0,
						outputTokens: json.usage.completion_tokens ?? 0,
						totalTokens: json.usage.total_tokens ?? 0
					}
				}
			} catch {
				// malformed SSE line — skip
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
