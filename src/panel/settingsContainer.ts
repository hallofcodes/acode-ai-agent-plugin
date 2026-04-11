import { getElement } from './utils'
import {
	addLifetimeTokens,
	aiSettings,
	formatTokenNumber,
	loadAiSettingsFromLocalStorage,
	saveAiSettingsToLocalStorage
} from '../chats/settings'
import { Provider } from '../chats/types'

export const settingsContainer = (container: HTMLElement, doc: Document) => {
	const settingsBtn = getElement<HTMLButtonElement>(container, '#settings-btn')
	const settingsDialog = getElement<HTMLElement>(container, '#settings-dialog')
	const modelSel = getElement<HTMLSelectElement>(container, '#model-select')
	const selBtn = getElement<HTMLButtonElement>(container, '#sel-btn')
	const settingsCloseBtn = getElement<HTMLButtonElement>(
		container,
		'#settings-close-btn'
	)
	const providerInput = getElement<HTMLSelectElement>(
		container,
		'#setting-provider'
	)
	const maxTokensInput = getElement<HTMLInputElement>(
		container,
		'#setting-max-tokens'
	)
	const temperatureInput = getElement<HTMLInputElement>(
		container,
		'#setting-temperature'
	)
	const lifetimeTokensEl = getElement<HTMLElement>(
		container,
		'#setting-lifetime-tokens'
	)
	const modelOpenAIInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-openai'
	)
	const modelDeepSeekInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-deepseek'
	)
	const modelClaudeInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-claude'
	)
	const modelGeminiInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-gemini'
	)
	const modelOllamaInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-ollama'
	)
	const modelOpenRouterInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-openrouter'
	)
	const ollamaHostInput = getElement<HTMLInputElement>(
		container,
		'#setting-ollama-host'
	)
	const openRouterSiteUrlInput = getElement<HTMLInputElement>(
		container,
		'#setting-openrouter-site-url'
	)
	const openRouterSiteNameInput = getElement<HTMLInputElement>(
		container,
		'#setting-openrouter-site-name'
	)

	let settingsDialogOpen = false

	const refreshSettingsUI = (): void => {
		modelSel.value = aiSettings.provider
		providerInput.value = aiSettings.provider
		maxTokensInput.value = String(aiSettings.maxTokens)
		temperatureInput.value = String(aiSettings.temperature)
		modelOpenAIInput.value = aiSettings.models.openai
		modelDeepSeekInput.value = aiSettings.models.deepseek
		modelClaudeInput.value = aiSettings.models.claude
		modelGeminiInput.value = aiSettings.models.gemini
		modelOllamaInput.value = aiSettings.models.ollama
		modelOpenRouterInput.value = aiSettings.models.openrouter
		ollamaHostInput.value = aiSettings.ollamaHost
		openRouterSiteUrlInput.value = aiSettings.openRouterSiteUrl
		openRouterSiteNameInput.value = aiSettings.openRouterSiteName
		lifetimeTokensEl.textContent = formatTokenNumber(
			aiSettings.lifetimeTokensUsed
		)
	}

	const openSettingsDialog = (): void => {
		refreshSettingsUI()
		settingsDialog.classList.add('open')
		settingsDialogOpen = true
	}

	const closeSettingsDialog = (): void => {
		settingsDialog.classList.remove('open')
		settingsDialogOpen = false
	}

	const persistSettings = (): void => {
		saveAiSettingsToLocalStorage()
		refreshSettingsUI()
	}

	const clampNumber = (
		value: string,
		min: number,
		max: number,
		fallback: number
	): number => {
		const parsed = Number(value)
		if (!Number.isFinite(parsed)) return fallback
		return Math.min(max, Math.max(min, parsed))
	}

	settingsBtn.onclick = openSettingsDialog
	settingsCloseBtn.onclick = closeSettingsDialog

	modelSel.addEventListener('change', () => {
		aiSettings.provider = modelSel.value as Provider
		persistSettings()
	})

	providerInput.addEventListener('change', () => {
		aiSettings.provider = providerInput.value as Provider
		persistSettings()
	})

	maxTokensInput.addEventListener('change', () => {
		aiSettings.maxTokens = Math.round(
			clampNumber(maxTokensInput.value, 1, 1000000, aiSettings.maxTokens)
		)
		persistSettings()
	})

	temperatureInput.addEventListener('change', () => {
		aiSettings.temperature = clampNumber(
			temperatureInput.value,
			0,
			1,
			aiSettings.temperature
		)
		persistSettings()
	})

	modelOpenAIInput.addEventListener('change', () => {
		aiSettings.models.openai =
			modelOpenAIInput.value.trim() || aiSettings.models.openai
		persistSettings()
	})
	modelDeepSeekInput.addEventListener('change', () => {
		aiSettings.models.deepseek =
			modelDeepSeekInput.value.trim() || aiSettings.models.deepseek
		persistSettings()
	})
	modelClaudeInput.addEventListener('change', () => {
		aiSettings.models.claude =
			modelClaudeInput.value.trim() || aiSettings.models.claude
		persistSettings()
	})
	modelGeminiInput.addEventListener('change', () => {
		aiSettings.models.gemini =
			modelGeminiInput.value.trim() || aiSettings.models.gemini
		persistSettings()
	})
	modelOllamaInput.addEventListener('change', () => {
		aiSettings.models.ollama =
			modelOllamaInput.value.trim() || aiSettings.models.ollama
		persistSettings()
	})
	modelOpenRouterInput.addEventListener('change', () => {
		aiSettings.models.openrouter =
			modelOpenRouterInput.value.trim() || aiSettings.models.openrouter
		persistSettings()
	})

	ollamaHostInput.addEventListener('change', () => {
		aiSettings.ollamaHost = ollamaHostInput.value.trim()
		persistSettings()
	})
	openRouterSiteUrlInput.addEventListener('change', () => {
		aiSettings.openRouterSiteUrl = openRouterSiteUrlInput.value.trim()
		persistSettings()
	})
	openRouterSiteNameInput.addEventListener('change', () => {
		aiSettings.openRouterSiteName = openRouterSiteNameInput.value.trim()
		persistSettings()
	})

	loadAiSettingsFromLocalStorage()
	refreshSettingsUI()

	doc.addEventListener('click', event => {
		if (
			settingsDialogOpen &&
			event.target instanceof Element &&
			event.target.id === 'settings-dialog'
		)
			closeSettingsDialog()
	})
}
