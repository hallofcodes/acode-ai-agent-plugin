export interface ChatMessage {
	role: 'user' | 'assistant'
	text: string
	ctx?: string | null
	modelUsed?: string
}

export interface ContextFile {
	/**
	 * File unique id.
	 */
	id: string
	filename: string
	previewName: string
	previewUri: string
	location: string
	uri: string
}

export interface AIPanelAPI {
	addContext: (file: ContextFile) => void
	clearContext: () => void
	clear: () => void
}
