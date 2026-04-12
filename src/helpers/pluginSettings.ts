import { Provider } from '../chats/types'
import { PLUGIN_ID } from '../configs/constants'
import { aiSettings } from '../chats/settings'

export interface PluginSettings {
	claude: string
	openai: string
	gemini: string
	deepseek: string
	openrouter: string
}

type UpdateFn = (
	v: Partial<Acode.ISettings>,
	showToast: boolean,
	save: boolean
) => Promise<void>

// Typed getter
export function getPluginSettings(): Partial<PluginSettings> {
	const settings = acode.require('settings')
	return (
		((settings.value as unknown as Record<string, unknown>)[
			PLUGIN_ID
		] as Partial<PluginSettings>) ?? {}
	)
}

// Typed setter — mutates + persists
export async function setPluginSetting<K extends keyof PluginSettings>(
	key: K,
	value: PluginSettings[K]
): Promise<void> {
	const settings = acode.require('settings')
	const current = getPluginSettings()
	const updated = { ...current, [key]: value }

	// Mutate in-memory
	;(settings.value as unknown as Record<string, unknown>)[PLUGIN_ID] = updated

	// Persist — double cast to bypass ISettings type mismatch
	// Third arg `save: true` is what actually writes to disk
	await (settings.update as unknown as UpdateFn)(
		{ [PLUGIN_ID]: updated } as Partial<Acode.ISettings>,
		false, // no toast
		true // save to disk
	)
}

// Load all saved keys into aiSettings on plugin init
export function loadSavedKeys(): void {
	const saved = getPluginSettings()

	for (const [key, value] of Object.entries(saved)) {
		if (value) {
			aiSettings.apiKeys[key as Provider] = value
		}
	}
}
