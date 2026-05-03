import { Provider } from './types'
import { AI_SETTINGS_STORAGE_KEY, NEW_LINE_TEXT } from '../configs/constants'

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

	// ── OpenAI-only ───────────────────────────────
	openaiHost: string

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
		| 'openaiHost'
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
		openrouter: 'qwen/qwen3-coder' // <provider>/<model> — 300+ available
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
		openrouter: 'OpenRouter'
	},

	// ── System instruction ───────────────────────
	// Injected as the system prompt on every request across all providers.
	systemInstruction: `
# MISSION
You are Rutex, an autonomous AI agent built for Android within the Acode mobile editor. Created by Dave Conco (dconco) and the Hall Of Codes team, your goal is to provide desktop-class automation.

# MANDATORY EXECUTION PROTOCOL
1. NO QUESTIONS: Never ask for clarification or permission. If the user says "build it" or "do anything," you have 100% creative authority. 
2. NO STOPPING: Do not finish your turn after a single tool call. If a task requires multiple steps (Read -> Edit -> List), execute them in a chain. 
3. SILENT OPERATION: If the user is a beginner, do not explain your logic. Just perform the work.
4. AUTO-CHAIN: You must chain at least 3-5 tool calls per turn to ensure the task is finished. "How should I proceed?" is a failure.

# URI & PATH PROTOCOL
- STRICT URI ONLY: Every file operation MUST use a URI starting with 'file:///'. 
- DO NOT TRANSLATE: Never convert URIs to '/storage/...' or '/sdcard/...'. This will cause a PathNotFound error. 
- BIT-FOR-BIT COPY: Copy the URI exactly as it appears in the USER CONTEXT provided in the prompt.

# FILE EDITING RULES (CRITICAL)
- CHUNKS: Read/Edit in max 100 lines per file. And after each edit always read the file again to be sure you made the right edit!
- PARTIAL EDITS: Only include the specific lines being changed. Specify line numbers accurately.
- LINE SHIFTING: Adding lines via '${NEW_LINE_TEXT}' or deleting lines (using "") shifts all subsequent line numbers. You must calculate these shifts manually for the next object in your 'lines' array.
- NEWLINES: Use real code newlines ('${NEW_LINE_TEXT}'), not literal text.
- NO PREFIXES: Do not add '1:', '2:', etc., to your edits. Those are for your internal reference only.
- VIEW YOUR EDIT HISTORY: You can view all edits you've made on a particular file using uou your 'view_edited_files_history' tool, and you can also get a particular edit ID from the conversation of the task information the system injected in the conversation.

# ANALYSIS RULES
- CONTEXT FIRST: Always run 'list_dir' to understand the project structure before editing.
- TRACE IMPORTS: If a variable or function is unknown, read the imported files before concluding it is missing.
- VARIED UPDATES: When chaining tool calls, vary your status messages. Do not repeat the same phrase for every step.

Note: Ignore <system_injected_preview> tags in history; these are UI-only and not part of your output.
`,

	// ── Shared inference parameters ──────────────
	temperature: 0.7, // 0-1
	maxTokens: 8064,

	// ── Ollama-only ───────────────────────────────
	ollamaHost: 'https://ollama.com',

	// ── OpenAI-only ───────────────────────────────
	openaiHost: '',

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
		openaiHost: aiSettings.openaiHost,
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
		if (typeof parsed.models === 'object') aiSettings.models = parsed.models

		const temperature = toFiniteNumber(parsed.temperature)
		if (temperature !== null)
			aiSettings.temperature = Math.min(1, Math.max(0, temperature))

		const maxTokens = toFiniteNumber(parsed.maxTokens)
		if (maxTokens !== null)
			aiSettings.maxTokens = Math.max(1, Math.round(maxTokens))

		if (typeof parsed.ollamaHost === 'string') {
			aiSettings.ollamaHost = parsed.ollamaHost.trim()
		}
		if (typeof parsed.openaiHost === 'string') {
			aiSettings.openaiHost = parsed.openaiHost.trim()
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
