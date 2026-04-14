import {
	PluginSettings,
	setPluginSetting,
	getPluginSettings,
	loadSavedKeys
} from './helpers/pluginSettings'
import { addIcon, removeIcon } from './sidebar'
import {
	PLUGIN_ID,
	AI_SETTINGS_STORAGE_KEY,
	LAST_ACTIVE_CHAT_HISTORY_KEY,
	CHAT_HISTORY_PREFIX
} from './configs/constants'
import { aiSettings, loadAiSettingsFromLocalStorage } from './chats/settings'
import { Provider } from './chats/types'
import { deleteAllChatHistory } from './chats/history/chatHistory'

function clg(...messages: unknown[]) {
	let newMsg = ''

	messages.forEach(msg => {
		if (typeof msg === 'object') {
			newMsg += JSON.stringify(msg, null, 2) + ' '
		} else {
			newMsg += String(msg) + ' '
		}
	})

	alert(newMsg.trim())
}
window.clg = clg

class MainPlugin {
	static baseUrl: string = ''

	async init() {
		loadAiSettingsFromLocalStorage()
		addIcon()
	}

	async destroy() {
		removeIcon()
		await deleteAllChatHistory()

		localStorage.removeItem('draft-message')
		localStorage.removeItem(AI_SETTINGS_STORAGE_KEY)
		localStorage.removeItem(LAST_ACTIVE_CHAT_HISTORY_KEY)
		localStorage.removeItem(CHAT_HISTORY_PREFIX)
	}
}

if (window.acode) {
	loadSavedKeys()
	const myPlugin = new MainPlugin()

	const formatSecret = (secret: unknown): string =>
		'•'.repeat(String(secret || '').length)

	const list = []

	for (const model in aiSettings.apiKeys) {
		const maskedApiKey = formatSecret(aiSettings.apiKeys[model as Provider])
		const modelLabel = aiSettings.providers[model as Provider]

		list.push({
			key: model,
			text: `${modelLabel} API Key`,
			prompt: `Enter your ${modelLabel} API Key`,
			promptType: 'text',
			value: maskedApiKey
		})
	}

	acode.setPluginInit(
		PLUGIN_ID,
		async (
			baseUrl: string,
			$page: Acode.WCPage,
			options: Acode.PluginInitOptions
		) => {
			const { cacheFile, cacheFileUrl } = options

			if (!baseUrl.endsWith('/')) {
				baseUrl += '/'
			}

			MainPlugin.baseUrl = baseUrl
			await myPlugin.init()
		},
		{
			list,
			cb: (key: string, value: unknown) => {
				setPluginSetting(key as keyof PluginSettings, String(value))
				aiSettings.apiKeys[key as Provider] = String(value)
			}
		}
	)

	acode.setPluginUnmount(PLUGIN_ID, () => {
		myPlugin.destroy()
	})
}
