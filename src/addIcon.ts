import Icon from './icons/icon.svg'

const sideBarApps = acode.require('sidebarApps')

const addIcon = () => {
	acode.addIcon('ai-agent-icon', Icon, { monochrome: true })

	sideBarApps.add(
		'ai-agent-icon',
		'hallofcodes.plugin.ai-agent',
		'AI Agent',
		(container: HTMLElement) => {
			container.innerHTML = '<h1>AI Agent Sidebar</h1>'
		},
		false,
		() => {
			// Optional: logic to run whenever the sidebar is toggled open
		}
	)
}

const removeIcon = () => {
	sideBarApps.remove('hallofcodes.plugin.ai-agent')
}

export { addIcon, removeIcon }
