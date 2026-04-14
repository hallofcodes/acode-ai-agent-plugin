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
import { StreamChunk, StreamFunction, ChatMessage } from './types'

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
	signal: AbortSignal
): AsyncGenerator<StreamChunk> {
	const { provider } = aiSettings
	const model = aiSettings.models[provider]
	const apiKey = aiSettings.apiKeys[provider]

	let StreamModel: StreamFunction

	try {
		StreamModel = (await require(`./providers/${provider}`)).default
	} catch {
		clg(`Unknown provider: "${provider}"`)
		throw new Error()
	}

	yield* StreamModel(model, messages, signal)
}

// ─────────────────────────────────────────────
// Usage example
// ─────────────────────────────────────────────

export async function example() {
	aiSettings.systemInstruction =
		'You are a senior software engineer. Be concise.'

	const messages: ChatMessage[] = [
		{ role: 'user', content: 'Explain recursion in one sentence.' }
	]

	// ── Basic streaming ──────────────────────────
	clg('Response: ')

	// ── With stop button (AbortController) ───────
	const controller = new AbortController()

	try {
		for await (const chunk of sendChat(messages, controller.signal)) {
			clg('In loop')
			if (chunk.type === 'text') {
				clg(chunk.delta) // append each token as it arrives
			} else if (chunk.type === 'done') {
				clg(`\n\n[${chunk.provider} / ${chunk.model}]`)
				clg(
					`Tokens — in: ${chunk.usage.inputTokens}, out: ${chunk.usage.outputTokens}`
				)
			} else {
				clg('Nothing from stream result', chunk)
			}
		}
	} catch (e: unknown) {
		if (e instanceof Error && e.name === 'AbortError') {
			clg('\nStream cancelled by user.')
		} else if (e instanceof Error) {
			clg('Error:', e.message)
		} else {
			clg('Unknown Error:', e)
		}
	}

	// Simulate user clicking stop after 2 seconds
	setTimeout(() => controller.abort(), 2000)
}
