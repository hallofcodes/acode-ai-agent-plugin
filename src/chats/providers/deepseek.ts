import OpenAI from 'openai'
import { aiSettings } from '../settings'
import { StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// DeepSeek  (OpenAI-compatible)
// deepseek-chat      → standard
// deepseek-reasoner  → thinking/CoT mode (reasoning_content in raw)
// ─────────────────────────────────────────────

async function* streamDeepSeek(
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const client = new OpenAI({
		apiKey: aiSettings.apiKeys.deepseek,
		baseURL: 'https://api.deepseek.com',
		dangerouslyAllowBrowser: true
	})

	const stream = await client.chat.completions.create(
		{
			model,
			temperature: aiSettings.temperature,
			max_tokens: aiSettings.maxTokens,
			stream: true,
			messages: [
				{ role: 'system', content: aiSettings.systemInstruction },
				...messages.map(m => ({ role: m.role, content: m.content }))
			]
		},
		{ signal }
	)

	let fullText = ''
	let resolvedModel = model

	for await (const chunk of stream) {
		if (signal?.aborted) break

		resolvedModel = chunk.model ?? resolvedModel

		const delta = chunk.choices[0]?.delta?.content ?? ''
		if (delta) {
			fullText += delta
			yield { type: 'text', delta }
		}
	}

	// DeepSeek does not reliably send usage in stream mode — zeroed out here
	yield {
		type: 'done',
		text: fullText,
		provider: 'deepseek',
		model: resolvedModel,
		usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
	}
}

export default streamDeepSeek
