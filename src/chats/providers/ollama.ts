import { Ollama } from 'ollama'
import { aiSettings } from '../settings'
import { StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Ollama  (local inference)
// ─────────────────────────────────────────────

async function* streamOllama(
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const config: Record<string, any> = {}

	if (aiSettings.ollamaHost.length) config['host'] = aiSettings.ollamaHost
	if (aiSettings.apiKeys.ollama.length)
		config['headers']['Authorization'] = 'Bearer ' + aiSettings.apiKeys.ollama

	const ollama = new Ollama(config)

	const stream = await ollama.chat({
		model,
		stream: true,
		messages: [
			{ role: 'system', content: aiSettings.systemInstruction },
			...messages.map(m => ({ role: m.role, content: m.content }))
		],
		options: {
			temperature: aiSettings.temperature,
			num_predict: aiSettings.maxTokens
		}
	})

	let fullText = ''
	let lastChunk: Awaited<typeof stream> extends AsyncIterable<infer T>
		? T
		: never
	// @ts-ignore — we'll grab the final chunk for usage
	lastChunk = null

	for await (const chunk of stream) {
		if (signal?.aborted) break

		const delta = chunk.message?.content ?? ''
		if (delta) {
			fullText += delta
			yield { type: 'text', delta }
		}

		// @ts-ignore
		lastChunk = chunk
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'ollama',
		// @ts-ignore
		model: lastChunk?.model ?? model,
		usage: {
			// @ts-ignore
			inputTokens: lastChunk?.prompt_eval_count ?? 0,
			// @ts-ignore
			outputTokens: lastChunk?.eval_count ?? 0,
			// @ts-ignore
			totalTokens:
				(lastChunk?.prompt_eval_count ?? 0) + (lastChunk?.eval_count ?? 0)
		}
	}
}

export default streamOllama
