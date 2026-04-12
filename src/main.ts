import {
	PluginSettings,
	setPluginSetting,
	getPluginSettings,
	loadSavedKeys
} from './helpers/pluginSettings'
import { addIcon, removeIcon } from './sidebar'
import { PLUGIN_ID } from './configs/constants'
import { aiSettings } from './chats/settings'
import { Provider } from './chats/types'

function clg(...messages: unknown[]) {
	alert(messages.join(' '))
}
window.clg = clg

class MainPlugin {
	static baseUrl: string = ''

	async init() {
		loadSavedKeys()
		addIcon()
	}

	async destroy() {
		removeIcon()
	}
}

if (window.acode) {
	const saved = getPluginSettings()
	const myPlugin = new MainPlugin()

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
			list: [
				{
					key: 'gemini',
					text: 'Gemini API Key',
					prompt: 'Enter your Gemini API Key',
					promptType: 'text',
					value: saved.gemini ?? ''
				},
				{
					key: 'claude',
					text: 'Claude API Key',
					prompt: 'Enter your Claude API Key',
					promptType: 'text',
					value: saved.claude ?? ''
				},
				{
					key: 'deepseek',
					text: 'DeepSeek API Key',
					prompt: 'Enter your DeepSeek API Key',
					promptType: 'text',
					value: saved.deepseek ?? ''
				},
				{
					key: 'openai',
					text: 'OpenAI API Key',
					prompt: 'Enter your OpenAI API Key',
					promptType: 'text',
					value: saved.openai ?? ''
				},
				{
					key: 'openrouter',
					text: 'OpenRouter API Key',
					prompt: 'Enter your OpenRouter API Key',
					promptType: 'text',
					value: saved.openrouter ?? ''
				}
			],
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
