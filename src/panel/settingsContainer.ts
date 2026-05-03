import { getElement, doc } from './utils'
import {
	aiSettings,
	formatTokenNumber,
	saveAiSettingsToLocalStorage
} from '../chats/settings'
import { Provider } from '../chats/types'
import { ProviderModelMeta } from '../chats/models/types'

const DROPDOWN_PROVIDERS = [
	'openai',
	'deepseek',
	'claude',
	'gemini',
	'openrouter',
	'qwen'
] as const satisfies readonly Provider[]

type DropdownProvider = (typeof DROPDOWN_PROVIDERS)[number]

const modelMetaCache: Partial<Record<Provider, ProviderModelMeta[]>> = {}

const getProviderModels = (provider: Provider): ProviderModelMeta[] => {
	const cached = modelMetaCache[provider]
	if (cached) return cached

	try {
		const models = (require(`../chats/models/${provider}_models`).default ??
			[]) as ProviderModelMeta[]
		modelMetaCache[provider] = models
		return models
	} catch {
		modelMetaCache[provider] = []
		return []
	}
}

export const settingsContainer = (container: HTMLElement) => {
	const aiPanelEl = getElement<HTMLElement>(container, '#ai-panel')
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
	const modelOpenAITrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-openai-btn'
	)
	const customModelOpenaiInput = getElement<HTMLInputElement>(
		container,
		'#setting-custom-model-openai'
	)
	const openAIHostInput = getElement<HTMLInputElement>(
		container,
		'#setting-openai-host'
	)
	const modelDeepSeekTrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-deepseek-btn'
	)
	const modelClaudeTrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-claude-btn'
	)
	const modelGeminiTrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-gemini-btn'
	)
	const modelQwenTrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-qwen-btn'
	)
	const modelOllamaInput = getElement<HTMLInputElement>(
		container,
		'#setting-model-ollama'
	)
	const modelOpenRouterTrigger = getElement<HTMLButtonElement>(
		container,
		'#setting-model-openrouter-btn'
	)
	const modelInfoOpenAI = getElement<HTMLElement>(
		container,
		'#setting-model-info-openai'
	)
	const modelInfoDeepSeek = getElement<HTMLElement>(
		container,
		'#setting-model-info-deepseek'
	)
	const modelInfoClaude = getElement<HTMLElement>(
		container,
		'#setting-model-info-claude'
	)
	const modelInfoGemini = getElement<HTMLElement>(
		container,
		'#setting-model-info-gemini'
	)
	const modelInfoQwen = getElement<HTMLElement>(
		container,
		'#setting-model-info-qwen'
	)
	const modelInfoOpenRouter = getElement<HTMLElement>(
		container,
		'#setting-model-info-openrouter'
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

	const modelTriggers: Record<DropdownProvider, HTMLButtonElement> = {
		openai: modelOpenAITrigger,
		deepseek: modelDeepSeekTrigger,
		claude: modelClaudeTrigger,
		gemini: modelGeminiTrigger,
		qwen: modelQwenTrigger,
		openrouter: modelOpenRouterTrigger
	}

	const modelInfoEls: Record<DropdownProvider, HTMLElement> = {
		openai: modelInfoOpenAI,
		deepseek: modelInfoDeepSeek,
		claude: modelInfoClaude,
		gemini: modelInfoGemini,
		qwen: modelInfoQwen,
		openrouter: modelInfoOpenRouter
	}

	let settingsDialogOpen = false
	let modelMenuOpen = false
	let modelMenuProvider: DropdownProvider | null = null
	let modelMenuTrigger: HTMLButtonElement | null = null

	const modelMenuEl = doc.document.createElement('div')
	modelMenuEl.className = 'model-search-menu'
	modelMenuEl.innerHTML = `
<input class="model-search-input" type="text" placeholder="Search model..." />
<div class="model-search-options"></div>
`
	aiPanelEl.appendChild(modelMenuEl)

	const modelSearchInput = getElement<HTMLInputElement>(
		modelMenuEl,
		'.model-search-input'
	)
	const modelSearchOptions = getElement<HTMLElement>(
		modelMenuEl,
		'.model-search-options'
	)

	const escapeHtml = (value: string): string => {
		const temp = doc.document.createElement('span')
		temp.textContent = value
		return temp.innerHTML
	}

	const findModelMeta = (
		provider: Provider,
		modelId: string
	): ProviderModelMeta | null => {
		if (!modelId.trim()) return null
		return (
			getProviderModels(provider).find(model => model.id === modelId) ?? null
		)
	}

	const getModelLabel = (provider: Provider, modelId: string): string =>
		findModelMeta(provider, modelId)?.label ?? modelId

	const renderModelInfo = (provider: DropdownProvider): void => {
		const infoEl = modelInfoEls[provider]
		const selectedModel = aiSettings.models[provider]
		const modelMeta = findModelMeta(provider, selectedModel)

		if (!modelMeta) {
			infoEl.innerHTML =
				'<span class="model-info-empty">No metadata available for this model.</span>'
			return
		}

		const bestFor = modelMeta.bestFor
			.map(task => `<li>${escapeHtml(task)}</li>`)
			.join('')

		infoEl.innerHTML = `
         <div><strong>Model ID:</strong> ${escapeHtml(modelMeta.id)}</div>
         <div><strong>Context:</strong> ${escapeHtml(modelMeta.contextWindow)}</div>
         <div><strong>Max output:</strong> ${escapeHtml(modelMeta.maxOutputTokens)}</div>
         <div><strong>Best for:</strong></div>
         <ul>${bestFor}</ul>
         ${
         	modelMeta.notes
         		? `<div><strong>Notes:</strong> ${escapeHtml(modelMeta.notes)}</div>`
         		: ''
         }
      `
	}

	const refreshSettingsUI = (): void => {
		modelSel.value = aiSettings.provider
		providerInput.value = aiSettings.provider
		maxTokensInput.value = String(aiSettings.maxTokens)
		temperatureInput.value = String(aiSettings.temperature)
		modelOpenAITrigger.textContent = getModelLabel(
			'openai',
			aiSettings.models.openai
		)
		openAIHostInput.value = aiSettings.openaiHost
		customModelOpenaiInput.value = aiSettings.models.openai
		modelDeepSeekTrigger.textContent = getModelLabel(
			'deepseek',
			aiSettings.models.deepseek
		)
		modelClaudeTrigger.textContent = getModelLabel(
			'claude',
			aiSettings.models.claude
		)
		modelGeminiTrigger.textContent = getModelLabel(
			'gemini',
			aiSettings.models.gemini
		)
		modelQwenTrigger.textContent = getModelLabel(
			'qwen',
			aiSettings.models.qwen
		)
		modelOllamaInput.value = aiSettings.models.ollama
		modelOpenRouterTrigger.textContent = getModelLabel(
			'openrouter',
			aiSettings.models.openrouter
		)
		renderModelInfo('openai')
		renderModelInfo('deepseek')
		renderModelInfo('claude')
		renderModelInfo('gemini')
		renderModelInfo('qwen')
		renderModelInfo('openrouter')
		ollamaHostInput.value = aiSettings.ollamaHost
		openRouterSiteUrlInput.value = aiSettings.openRouterSiteUrl
		openRouterSiteNameInput.value = aiSettings.openRouterSiteName
		lifetimeTokensEl.textContent = formatTokenNumber(
			aiSettings.lifetimeTokensUsed
		)
	}

	const closeModelMenu = (): void => {
		modelMenuEl.classList.remove('open')
		modelMenuOpen = false
		modelMenuProvider = null
		modelMenuTrigger = null
		modelSearchInput.value = ''
		modelSearchOptions.innerHTML = ''
	}

	const renderModelMenuOptions = (): void => {
		if (!modelMenuProvider) return

		const search = modelSearchInput.value.trim().toLowerCase()
		const options = getProviderModels(modelMenuProvider).filter(model => {
			if (!search) return true
			return (
				model.id.toLowerCase().includes(search) ||
				model.label.toLowerCase().includes(search)
			)
		})

		modelSearchOptions.innerHTML = ''

		if (!options.length) {
			const empty = doc.document.createElement('div')
			empty.className = 'model-search-empty'
			empty.textContent = 'No models found.'
			modelSearchOptions.appendChild(empty)
			return
		}

		options.forEach(model => {
			const option = doc.document.createElement('button')
			option.className = 'model-search-option'
			option.type = 'button'
			option.textContent = `${model.label} (${model.id})`
			option.addEventListener('click', () => {
				if (!modelMenuProvider) return
				aiSettings.models[modelMenuProvider] = model.id

				if (modelMenuProvider == 'openai')
					customModelOpenaiInput.value = model.id

				persistSettings()
				closeModelMenu()
			})
			modelSearchOptions.appendChild(option)
		})
	}

	const positionModelMenu = (trigger: HTMLElement): void => {
		const panelRect = aiPanelEl.getBoundingClientRect()
		const triggerRect = trigger.getBoundingClientRect()
		const fromTop = triggerRect.top < panelRect.top + panelRect.height / 2
		const left = Math.min(
			Math.max(triggerRect.left - panelRect.left, 4),
			Math.max(panelRect.width - 224, 4)
		)

		modelMenuEl.style.left = `${left}px`
		modelMenuEl.style.right = 'auto'
		modelMenuEl.style.top = fromTop
			? `${triggerRect.bottom - panelRect.top + 4}px`
			: 'auto'
		modelMenuEl.style.bottom = fromTop
			? 'auto'
			: `${panelRect.bottom - triggerRect.top + 4}px`
	}

	const openModelMenu = (
		provider: DropdownProvider,
		trigger: HTMLButtonElement
	): void => {
		modelMenuProvider = provider
		modelMenuTrigger = trigger
		modelMenuOpen = true
		positionModelMenu(trigger)
		renderModelMenuOptions()
		modelMenuEl.classList.add('open')
		modelSearchInput.focus()
	}

	const openSettingsDialog = (): void => {
		refreshSettingsUI()
		settingsDialog.classList.add('open')
		settingsDialogOpen = true
	}

	const closeSettingsDialog = (): void => {
		settingsDialog.classList.remove('open')
		settingsDialogOpen = false
		closeModelMenu()
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

	DROPDOWN_PROVIDERS.forEach(provider => {
		modelTriggers[provider].addEventListener('click', () =>
			openModelMenu(provider, modelTriggers[provider])
		)
	})

	modelSearchInput.addEventListener('input', renderModelMenuOptions)

	customModelOpenaiInput.addEventListener('change', () => {
		aiSettings.models.openai =
			customModelOpenaiInput.value.trim() || aiSettings.models.openai
		persistSettings()
	})

	openAIHostInput.addEventListener('change', () => {
		aiSettings.openaiHost = openAIHostInput.value.trim()
		persistSettings()
	})

	modelOllamaInput.addEventListener('change', () => {
		aiSettings.models.ollama =
			modelOllamaInput.value.trim() || aiSettings.models.ollama
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

	doc.document.addEventListener('click', event => {
		if (
			settingsDialogOpen &&
			event.target instanceof Element &&
			event.target.id === 'settings-dialog'
		)
			closeSettingsDialog()
	})

	doc.document.addEventListener(
		'click',
		event => {
			if (!modelMenuOpen) return
			if (!(event.target instanceof Node)) return
			if (
				modelMenuEl.contains(event.target) ||
				(modelMenuTrigger && modelMenuTrigger.contains(event.target))
			) {
				return
			}
			closeModelMenu()
		},
		true
	)

	selBtn.disabled = false
	refreshSettingsUI()
}
