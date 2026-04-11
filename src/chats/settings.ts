import { Provider } from './types'

// ─────────────────────────────────────────────
// Global settings — edit this object to configure everything
// ─────────────────────────────────────────────

export const aiSettings = {
	// ── Active provider ──────────────────────────
	// Switch this one field to change which AI handles all sendChat() calls.
	// Options: "claude" | "openai" | "gemini" | "deepseek" | "ollama" | "openrouter"
	provider: 'gemini' as Provider,

	// ── Model per provider ───────────────────────
	models: {
		claude: 'claude-sonnet-4-6', // claude-opus-4-6 | claude-haiku-4-5
		openai: 'gpt-4o', // gpt-4.1 | gpt-5.4 | o3 | o4-mini
		gemini: 'gemini-2.5-flash', // gemini-2.5-pro | gemini-3-flash-preview
		deepseek: 'deepseek-chat', // deepseek-reasoner (thinking/CoT mode)
		ollama: 'llama3.1', // any model pulled locally
		openrouter: 'anthropic/claude-opus-4' // <provider>/<model> — 300+ available
	},

	// ── API keys ─────────────────────────────────
	apiKeys: {
		claude: process.env.ANTHROPIC_API_KEY ?? '',
		openai: process.env.OPENAI_API_KEY ?? '',
		gemini: process.env.GEMINI_API_KEY ?? '',
		deepseek: process.env.DEEPSEEK_API_KEY ?? '',
		ollama: '', // no key needed for local Ollama
		openrouter: process.env.OPENROUTER_API_KEY ?? ''
	},

	// ── System instruction ───────────────────────
	// Injected as the system prompt on every request across all providers.
	systemInstruction: 'You are a helpful, concise assistant.',

	// ── Shared inference parameters ──────────────
	temperature: 0.7, // 0–1
	maxTokens: 2048,

	// ── Ollama-only ───────────────────────────────
	ollamaHost: 'http://localhost:11434',

	// ── OpenRouter-only (optional attribution) ────
	openRouterSiteUrl: '', // shown on openrouter.ai leaderboards
	openRouterSiteName: ''
}
