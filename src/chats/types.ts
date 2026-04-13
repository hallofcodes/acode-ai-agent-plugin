// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type Role = 'user' | 'assistant'

export interface ChatMessage {
	role: Role
	content: string
}

export type Provider =
	| 'claude'
	| 'openai'
	| 'gemini'
	| 'deepseek'
	| 'ollama'
	| 'openrouter'

export interface Usage {
	inputTokens: number
	outputTokens: number
	totalTokens: number
}

/**
 * Each yield from sendChat() is one of these two shapes.
 *
 * - { type: "text" }  — a chunk of the response text, append to your UI
 * - { type: "done" }  — stream finished, contains full text + usage stats
 */
export type StreamChunk =
	| { type: 'text'; delta: string }
	| {
			type: 'done'
			text: string
			provider: Provider
			model: string
			usage: Usage
	  }

export type StreamFunction = (
	model: string,
	messages: ChatMessage[],
	signal?: AbortSignal
) => AsyncGenerator<StreamChunk>
