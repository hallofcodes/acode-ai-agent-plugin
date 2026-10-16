import { Provider } from '../chats/types'
import { PLUGIN_ID } from '../configs/constants'
import { aiSettings } from '../chats/settings'

export type PluginSettings = Record<Provider, string>

type UpdateFn = (
	v: Partial<Acode.ISettings>,
	showToast: boolean,
	save: boolean
) => Promise<void>

// Typed getter
export function getPluginSettings(): Partial<PluginSettings> {
	if (typeof acode === 'undefined' || !acode?.require) return {}
	try {
		const settings = acode.require('settings')
		return (
			((settings?.value as unknown as Record<string, unknown>)?.[
				PLUGIN_ID
			] as Partial<PluginSettings>) ?? {}
		)
	} catch {
		return {}
	}
}

// Typed setter — mutates + persists
export async function setPluginSetting<K extends keyof PluginSettings>(
	key: K,
	value: PluginSettings[K]
): Promise<void> {
	if (typeof acode === 'undefined' || !acode?.require) return
	try {
		const settings = acode.require('settings')
		const current = getPluginSettings()
		const updated = { ...current, [key]: value }

		// Mutate in-memory
		if (settings?.value) {
			;(settings.value as unknown as Record<string, unknown>)[PLUGIN_ID] = updated
		}

		// Persist — double cast to bypass ISettings type mismatch
		// Third arg `save: true` is what actually writes to disk
		if (settings?.update) {
			await (settings.update as unknown as UpdateFn)(
				{ [PLUGIN_ID]: updated } as Partial<Acode.ISettings>,
				false, // no toast
				true // save to disk
			)
		}
	} catch {
		// Ignore if acode settings API is unavailable
	}
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
