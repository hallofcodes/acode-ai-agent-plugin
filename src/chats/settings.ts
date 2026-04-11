import { Provider } from './types'

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

	// ── API keys ─────────────────────────────────
	apiKeys: {
		[P in Provider]: string
	}

	// ── System instruction ───────────────────────
	// Injected as the system prompt on every request across all providers.
	systemInstruction: string

	// ── Shared inference parameters ──────────────
	temperature: number // 0–1
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
		| 'temperature'
		| 'maxTokens'
		| 'ollamaHost'
		| 'openRouterSiteUrl'
		| 'openRouterSiteName'
		| 'lifetimeTokensUsed'
	>
>

const PROVIDERS: Provider[] = [
	'claude',
	'openai',
	'gemini',
	'deepseek',
	'ollama',
	'openrouter'
]

const AI_SETTINGS_STORAGE_KEY = 'acode-ai-agent:ai-settings'
const runtimeEnv: Record<string, string> =
	typeof process !== 'undefined' && process?.env
		? (process.env as Record<string, string>)
		: {}

const hasLocalStorage = (): boolean =>
	typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const toFiniteNumber = (value: unknown): number | null => {
	if (typeof value !== 'number' || !Number.isFinite(value)) return null
	return value
}

const toProvider = (value: unknown): Provider | null => {
	if (typeof value !== 'string') return null
	return PROVIDERS.includes(value as Provider) ? (value as Provider) : null
}

const normalizeModels = (models: unknown): AISettings['models'] | null => {
	if (!models || typeof models !== 'object') return null
	const next = { ...aiSettings.models }
	for (const provider of PROVIDERS) {
		const model = (models as Record<string, unknown>)[provider]
		if (typeof model === 'string' && model.trim() !== '') {
			next[provider] = model.trim()
		}
	}
	return next
}

export const aiSettings: AISettings = {
	// ── Active provider ──────────────────────────
	provider: 'gemini',

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
		claude: runtimeEnv.ANTHROPIC_API_KEY ?? '',
		openai: runtimeEnv.OPENAI_API_KEY ?? '',
		gemini: runtimeEnv.GEMINI_API_KEY ?? '',
		deepseek: runtimeEnv.DEEPSEEK_API_KEY ?? '',
		ollama: '', // no key needed for local Ollama
		openrouter: runtimeEnv.OPENROUTER_API_KEY ?? ''
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
	openRouterSiteUrl: '',
	openRouterSiteName: '',

	// ── Aggregated usage ───────────────────────────
	lifetimeTokensUsed: 0
}

export const saveAiSettingsToLocalStorage = (): void => {
	if (!hasLocalStorage()) return
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
	if (!hasLocalStorage()) return
	const raw = localStorage.getItem(AI_SETTINGS_STORAGE_KEY)
	if (!raw) return
	try {
		const parsed = JSON.parse(raw) as PersistedAISettings
		const provider = toProvider(parsed.provider)
		if (provider) aiSettings.provider = provider

		const models = normalizeModels(parsed.models)
		if (models) aiSettings.models = models

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
