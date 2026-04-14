import { Config, Ollama } from 'ollama'
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
	let config: Partial<Config> = {
		host: aiSettings.ollamaHost
	}

	if (aiSettings.apiKeys.ollama.length) {
		config = {
			...config,
			headers: {
				Authorization: `Bearer ${aiSettings.apiKeys.ollama}`
			}
		}
	}

	let ollama: Ollama

	if (aiSettings.ollamaHost.length) {
		ollama = new Ollama(config)
	} else {
		ollama = new Ollama()
	}

	try {
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
	} catch (error: any) {
		const activeHost = aiSettings.ollamaHost
		const reason = error instanceof Error ? error.message : 'unknown network error'
		throw new Error(
			`Failed to connect to Ollama at ${activeHost}. ${reason}`
		)
	}
}

export default streamOllama
