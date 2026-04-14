import OpenAI from 'openai'
import { aiSettings } from '../settings'
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

	const stream = await client.chat.completions.create(
		{
			model,
			temperature: aiSettings.temperature,
			max_tokens: aiSettings.maxTokens,
			stream: true,
			stream_options: { include_usage: true }, // ask OpenAI to send usage at the end
			messages: [
				{ role: 'system', content: aiSettings.systemInstruction },
				...messages.map(m => ({ role: m.role, content: m.content }))
			]
		},
		{ signal }
	)

	let fullText = ''
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
	let resolvedModel = model

	for await (const chunk of stream) {
		if (signal?.aborted) break

		resolvedModel = chunk.model ?? resolvedModel

		const delta = chunk.choices[0]?.delta?.content ?? ''
		if (delta) {
			fullText += delta
			yield { type: 'text', model: resolvedModel, delta }
		}

		// OpenAI sends usage in the final chunk when stream_options.include_usage is set
		if (chunk.usage) {
			usage = {
				inputTokens: chunk.usage.prompt_tokens ?? 0,
				outputTokens: chunk.usage.completion_tokens ?? 0,
				totalTokens: chunk.usage.total_tokens ?? 0
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
