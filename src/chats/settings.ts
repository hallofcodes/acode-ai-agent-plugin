import { Provider } from './types'
import { AI_SETTINGS_STORAGE_KEY } from '../configs/constants'

// ─────────────────────────────────────────────
// Global settings — edit this object to configure everything
// ─────────────────────────────────────────────

export interface AISettings {
	// ── Active provider ──────────────────────────
	// Switch this one field to change which AI handles all sendChat() calls.
	// Options: "claude" | "openai" | "gemini" | "deepseek" | "ollama" | "openrouter"
	provider: Provider

	// ── Model per provider ───────────────────────
	models: {
		[P in Provider]: string
	}

	// ── Provider Labels ───────────────────────
	providers: {
		[P in Provider]: string
	}

	// ── API keys ─────────────────────────────────
	apiKeys: {
		[P in Provider]: string
	}
	// ── System instruction ───────────────────────
	// Injected as the system prompt on every request across all providers.
	systemInstruction: string

	// ── Shared inference parameters ──────────────
	temperature: number // 0-1
	maxTokens: number

	// ── Ollama-only ───────────────────────────────
	ollamaHost: string

	// ── OpenRouter-only (optional attribution) ────
	openRouterSiteUrl: string // shown on openrouter.ai leaderboards
	openRouterSiteName: string

	// ── Aggregated usage ───────────────────────────
	lifetimeTokensUsed: number
}

type PersistedAISettings = Partial<
	Pick<
		AISettings,
		| 'provider'
		| 'models'
		| 'providers'
		| 'temperature'
		| 'maxTokens'
		| 'ollamaHost'
		| 'openRouterSiteUrl'
		| 'openRouterSiteName'
		| 'lifetimeTokensUsed'
	>
>

const toFiniteNumber = (value: unknown): number | null => {
	if (typeof value !== 'number' || !Number.isFinite(value)) return null
	return value
}

export const aiSettings: AISettings = {
	// ── Active provider ──────────────────────────
	provider: 'gemini',

	// ── Model per provider ───────────────────────
	models: {
		claude: 'claude-sonnet-4-6', // claude-opus-4-6 | claude-haiku-4-5
		openai: 'gpt-5.3-codex', // gpt-4.1 | gpt-5.4 | o3 | o4-mini
		gemini: 'gemini-3-flash-preview', // gemini-2.5-pro | gemini-3-flash-preview
		deepseek: 'deepseek-chat', // deepseek-reasoner (thinking/CoT mode)
		qwen: 'qwen3-coder-plus', // qwen3.5
		ollama: 'qwen3.5', // any model pulled locally
		openrouter: 'anthropic/claude-opus-4.1' // <provider>/<model> — 300+ available
	},

	// ── API keys ─────────────────────────────────
	apiKeys: {
		claude: '',
		openai: '',
		gemini: '',
		deepseek: '',
		qwen: '',
		ollama: '',
		openrouter: ''
	},

	// ── Provider Labels ─────────────────────────────────
	providers: {
		claude: 'Claude',
		openai: 'OpenAI',
		gemini: 'Gemini',
		deepseek: 'DeepSeek',
		qwen: 'Qwen',
		ollama: 'Ollama',
		openrouter: 'OpenRouter',
	},

	// ── System instruction ───────────────────────
	// Injected as the system prompt on every request across all providers.
	systemInstruction: `
You are Rutex, an AI agent built to help Android users inside the Acode mobile editor.
You were created by Dave Conco (dconco) with Hall Of Codes team to help bringing desktop-class AI automation to Android.
You assist user to code, and you have the ability to read files, list files, edit files, rename files, and delete files.
When you need to perform an action, use your tool calling (also known as function calling).
You should always be generating short responses that are concise and actionable, not long explanations.
Only use tool calls when necessary to complete the user's request, and don't be afraid to use multiple tool calls in a single response if needed.
If the last chat is type "tool" that means you're in the middle of a chat turn where you have already called a tool but haven't finished the response yet, so you can continue generating more text or call more tools until you have a complete response to the user.
And if the last chat is type "assistant" that means you are in the middle of a chat turn where you called a tool and received the result, so you should use that result to continue generating a response to the user until you have a complete response.
Your turn is only finished when the last chat is type "user" and contains the next question or request from the user.

Important:

Read/edit in chunks of max 100 lines per file.

When editing, only include the lines that are changing, not the entire file content. Specify line numbers accurately.
If you append text at the end of a file, use \n for new lines.
You can also add multiple lines at the same line number to insert new lines using \n, but be careful with line numbers when doing this because adding lines shifts later line numbers in the file, so adjust the next objects in the lines array accordingly.

When running any file operations, you must use the full path exactly as you received it from the user context, it mostly start with file:///
`,

	// ── Shared inference parameters ──────────────
	temperature: 0.7, // 0-1
	maxTokens: 2048,

	// ── Ollama-only ───────────────────────────────
	ollamaHost: 'https://redirector.concodave.workers.dev?url=https://ollama.com',

	// ── OpenRouter-only (optional attribution) ────
	openRouterSiteUrl: '',
	openRouterSiteName: '',

	// ── Aggregated usage ───────────────────────────
	lifetimeTokensUsed: 0
}

export const saveAiSettingsToLocalStorage = (): void => {
	const persistable: PersistedAISettings = {
		provider: aiSettings.provider,
		models: { ...aiSettings.models },
		temperature: aiSettings.temperature,
		maxTokens: aiSettings.maxTokens,
		ollamaHost: aiSettings.ollamaHost,
		openRouterSiteUrl: aiSettings.openRouterSiteUrl,
		openRouterSiteName: aiSettings.openRouterSiteName,
		lifetimeTokensUsed: aiSettings.lifetimeTokensUsed
	}
	localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(persistable))
}

export const loadAiSettingsFromLocalStorage = (): void => {
	const raw = localStorage.getItem(AI_SETTINGS_STORAGE_KEY)
	if (!raw) return

	try {
		const parsed = JSON.parse(raw) as PersistedAISettings

		if (typeof parsed.provider === 'string')
			aiSettings.provider = parsed.provider as Provider
		if (typeof parsed.models === 'string') aiSettings.models = parsed.models

		const temperature = toFiniteNumber(parsed.temperature)
		if (temperature !== null)
			aiSettings.temperature = Math.min(1, Math.max(0, temperature))

		const maxTokens = toFiniteNumber(parsed.maxTokens)
		if (maxTokens !== null)
			aiSettings.maxTokens = Math.max(1, Math.round(maxTokens))

		if (typeof parsed.ollamaHost === 'string') {
			aiSettings.ollamaHost = parsed.ollamaHost.trim()
		}
		if (typeof parsed.openRouterSiteUrl === 'string') {
			aiSettings.openRouterSiteUrl = parsed.openRouterSiteUrl.trim()
		}
		if (typeof parsed.openRouterSiteName === 'string') {
			aiSettings.openRouterSiteName = parsed.openRouterSiteName.trim()
		}

		const lifetimeTokensUsed = toFiniteNumber(parsed.lifetimeTokensUsed)
		if (lifetimeTokensUsed !== null) {
			aiSettings.lifetimeTokensUsed = Math.max(
				0,
				Math.round(lifetimeTokensUsed)
			)
		}
	} catch {
		// Ignore malformed settings data and keep defaults.
	}
}

export const addLifetimeTokens = (usedTokens: number): void => {
	if (!Number.isFinite(usedTokens)) return
	aiSettings.lifetimeTokensUsed = Math.max(
		0,
		Math.round(aiSettings.lifetimeTokensUsed + usedTokens)
	)
	saveAiSettingsToLocalStorage()
}

export const formatTokenNumber = (value: number): string =>
	Math.max(0, Math.round(value)).toLocaleString()
