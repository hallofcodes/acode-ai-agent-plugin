import { aiSettings } from '../settings'
import { StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Ollama
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const host =
		aiSettings.ollamaHost?.replace(/\/$/, '') || 'http://127.0.0.1:11434'

	const headers: Record<string, string> = {}
	if (aiSettings.apiKeys.ollama?.length) {
		headers['Authorization'] = `Bearer ${aiSettings.apiKeys.ollama}`
	}

	const body = JSON.stringify({
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

	console.log(`Connecting to Ollama at ${host}/api/chat`, { headers })

	let response: Response
	try {
		response = await fetch(`${host}/api/chat`, {
			method: 'POST',
			headers,
			body,
			signal
		})
	} catch (err: any) {
		throw new Error(
			`Failed to connect to Ollama at ${host}. ${
				err?.message ?? 'Network error — check CORS or host.'
			}`
		)
	}

	if (!response.ok) {
		const text = await response.text().catch(() => '')
		throw new Error(`Ollama responded ${response.status}: ${text}`)
	}

	const reader = response.body?.getReader()
	if (!reader) throw new Error('No response body from Ollama')

	const decoder = new TextDecoder()
	let fullText = ''
	let lastChunk: any = null

	try {
		while (signal?.aborted === false) {
			const { done, value } = await reader.read()
			if (done) break

			const lines = decoder
				.decode(value, { stream: true })
				.split('\n')
				.filter(Boolean)
			for (const line of lines) {
				try {
					const chunk = JSON.parse(line)
					lastChunk = chunk
					const delta = chunk.message?.content ?? ''

					if (delta) {
						fullText += delta
						yield { type: 'text', delta, model }
					}
				} catch {
					// incomplete JSON line, skip
				}
			}
		}
	} finally {
		reader.releaseLock()
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'ollama',
		model: lastChunk?.model ?? model,
		usage: {
			inputTokens: lastChunk?.prompt_eval_count ?? 0,
			outputTokens: lastChunk?.eval_count ?? 0,
			totalTokens:
				(lastChunk?.prompt_eval_count ?? 0) + (lastChunk?.eval_count ?? 0)
		}
	}
}
