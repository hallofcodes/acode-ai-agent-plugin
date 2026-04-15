import { aiSettings } from '../settings'
import { StreamChunk, ChatMessage } from '../types'

// ─────────────────────────────────────────────
// Qwen (OpenAI-compatible via fetch)
// ─────────────────────────────────────────────

export default async function* (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const formattedHistory = messages
		.map((message) => {
			const role = message.role === 'assistant' ? 'ASSISTANT' : 'USER'
			return `${role}:\n${message.content}`
		})
		.join('\n\n')

	const combinedPrompt = [
		'─────── SYSTEM INSTRUCTIONS ──────────────────────────────────────',
		aiSettings.systemInstruction,
		'',
		'─────── CONVERSATIONS ─────────────────────────────────────────────',
		formattedHistory
	].join('\n')

	const response = await fetch('https://qwen.aikit.club/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${aiSettings.apiKeys.qwen}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model,
			temperature: aiSettings.temperature,
			max_tokens: aiSettings.maxTokens,
			stream: true,
			messages: [{ role: 'user', content: combinedPrompt }]
		}),
		signal
	})

	if (!response.ok) {
		const err = await response.text()
		throw new Error(`Qwen API error ${response.status}: ${err}`)
	}

	const reader = response.body!.getReader()
	const decoder = new TextDecoder()
	let buffer = ''
	let fullText = ''
	let resolvedModel = model
	
	const usage = {
		inputTokens: 0,
		outputTokens: 0,
		totalTokens: 0
	}

	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		if (signal?.aborted) break

		buffer += decoder.decode(value, { stream: true })
		const lines = buffer.split('\n')
		buffer = lines.pop() ?? ''

		for (const line of lines) {
			const trimmed = line.trim()
			if (!trimmed || !trimmed.startsWith('data: ')) continue
			const data = trimmed.slice(6)
			if (data === '[DONE]') continue

			try {
				const chunk = JSON.parse(data)

				if (chunk.usage) {
					usage.inputTokens += chunk.usage.prompt_tokens || 0
					usage.outputTokens += chunk.usage.completion_tokens || 0
					usage.totalTokens += chunk.usage.total_tokens || 0
				}

				resolvedModel = chunk.model ?? resolvedModel
				const delta = chunk.choices?.[0]?.delta?.content ?? ''
	
				if (delta) {
					fullText += delta
					yield { type: 'text', model: resolvedModel, delta }
				}
			} catch {
				// malformed chunk, skip
			}
		}
	}

	yield {
		type: 'done',
		text: fullText,
		provider: 'qwen',
		model: resolvedModel,
		usage
	}
}
