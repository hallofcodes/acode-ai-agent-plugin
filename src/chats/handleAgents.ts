/**
 * Universal AI Chat Client — 2026 Edition (Streaming)
 *
 * Supports: Claude (Anthropic), GPT (OpenAI), Gemini (Google),
 *           DeepSeek, Ollama (local), OpenRouter
 *
 * sendChat() is an async generator — loop over it to get chunks as they
 * arrive. The last yielded chunk is always { type: "done", ... } with
 * final usage stats. Pass an AbortController signal to support a stop button.
 */

import { aiSettings } from './settings'
import { StreamChunk, ChatMessage } from './types'

// ─────────────────────────────────────────────
// Main entry point — async generator
// ─────────────────────────────────────────────

/**
 * Send a conversation and stream the response chunk by chunk.
 *
 * @param messages - Conversation history
 * @param signal   - Optional AbortSignal from an AbortController (stop button)
 *
 * @example Basic usage
 *   let fullText = "";
 *   for await (const chunk of sendChat(messages)) {
 *     if (chunk.type === "text") {
 *       fullText += chunk.delta;
 *       appendToUI(chunk.delta);
 *     }
 *     if (chunk.type === "done") {
 *       console.log("Total tokens:", chunk.usage.totalTokens);
 *     }
 *   }
 *
 * @example With stop button
 *   const controller = new AbortController();
 *   stopButton.onclick = () => controller.abort();
 *
 *   for await (const chunk of sendChat(messages, controller.signal)) {
 *     if (chunk.type === "text") appendToUI(chunk.delta);
 *   }
 */
export async function* sendChat(
	messages: ChatMessage[],
	signal?: AbortSignal
): AsyncGenerator<StreamChunk> {
	const { provider } = aiSettings
	const model = aiSettings.models[provider]
	const apiKey = aiSettings.apiKeys[provider]

	const StreamModel = (await require(`./models/${provider}`)).default
	clg('Provider:', provider, 'Loaded:', StreamModel)

	if (StreamModel) {
		yield* StreamModel(model, messages, signal)
	} else {
		alert(`Unknown provider: "${provider}"`)
	}
}

// ─────────────────────────────────────────────
// Usage example
// ─────────────────────────────────────────────

export async function example() {
	aiSettings.provider = 'claude'
	aiSettings.systemInstruction =
		'You are a senior software engineer. Be concise.'
	aiSettings.temperature = 0.4

	const messages: ChatMessage[] = [
		{ role: 'user', content: 'Explain recursion in one sentence.' }
	]

	// ── Basic streaming ──────────────────────────
	clg('Response: ')

	for await (const chunk of sendChat(messages)) {
		if (chunk.type === 'text') {
			clg(chunk.delta) // append each token as it arrives
		}
		if (chunk.type === 'done') {
			clg(`\n\n[${chunk.provider} / ${chunk.model}]`)
			clg(
				`Tokens — in: ${chunk.usage.inputTokens}, out: ${chunk.usage.outputTokens}`
			)
		}
	}

	// ── With stop button (AbortController) ───────
	const controller = new AbortController()

	// Simulate user clicking stop after 2 seconds
	setTimeout(() => controller.abort(), 2000)

	try {
		for await (const chunk of sendChat(messages, controller.signal)) {
			if (chunk.type === 'text') clg(chunk.delta)
			if (chunk.type === 'done') clg('\nDone.')
		}
	} catch (e) {
		if (e instanceof Error && e.name === 'AbortError') {
			clg('\nStream cancelled by user.')
		} else {
			throw e
		}
	}
}
