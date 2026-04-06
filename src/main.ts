import { addIcon, removeIcon } from './addIcon'

class MainPlugin {
	async init() {
		addIcon()
	}

	async destroy() {
		removeIcon()
	}
}

if (window.acode) {
	const myPlugin = new MainPlugin()

	acode.setPluginInit(
		'hallofcodes.plugin.ai-agent',
		async (
			baseUrl: string,
			$page: HTMLElement,
			{
				cacheFile,
				cacheFileUrl
			}: { cacheFile: string; cacheFileUrl: string }
		) => {
			if (!baseUrl.endsWith('/')) {
				baseUrl += '/'
			}
			await myPlugin.init()
		}
	)

	acode.setPluginUnmount('hallofcodes.plugin.ai-agent', () => {
		myPlugin.destroy()
	})
}
