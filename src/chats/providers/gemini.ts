import { GoogleGenAI } from '@google/genai'
import { aiSettings } from '../settings'
import { Usage, StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Gemini
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const ai = new GoogleGenAI({ apiKey: aiSettings.apiKeys.gemini })

	const contents = messages.map(m => ({
		role: m.role === 'assistant' ? 'model' : 'user',
		parts: [{ text: m.content }]
	}))

	const stream = await ai.models.generateContentStream({
		model,
		contents,
		config: {
			systemInstruction: aiSettings.systemInstruction,
			temperature: aiSettings.temperature,
			maxOutputTokens: aiSettings.maxTokens
		}
	})

	let fullText = ''
	let usage: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 }

	for await (const chunk of stream) {
		if (signal?.aborted) break

		const delta = chunk.text ?? ''
		if (delta) {
			fullText += delta
			yield { type: 'text', delta, model }
		}

		// Gemini sends usageMetadata on each chunk; the last one has the final totals
		const meta = (
			chunk as unknown as {
				usageMetadata?: {
					promptTokenCount?: number
					candidatesTokenCount?: number
					totalTokenCount?: number
				}
			}
		).usageMetadata

		if (meta) {
			usage = {
				inputTokens: meta.promptTokenCount ?? 0,
				outputTokens: meta.candidatesTokenCount ?? 0,
				totalTokens: meta.totalTokenCount ?? 0
			}
		}
	}

	yield { type: 'done', text: fullText, provider: 'gemini', model, usage }
}
