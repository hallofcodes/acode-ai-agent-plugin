import { deleteChatHistory, getHistoryList, retrieveChatHistory } from '../chats/history/chatHistory'
import type { ChatMessage } from './types'
import { getElement } from './utils'

export const historyContainer = (
	container: HTMLElement,
	doc: Document,
	onHistorySelected: (messages: ChatMessage[]) => void
): void => {
	const historyBtn = getElement<HTMLButtonElement>(container, '#history-btn')
	const historyDialog = getElement<HTMLElement>(container, '#history-dialog')
	const historyCloseBtn = getElement<HTMLButtonElement>(
		container,
		'#history-close-btn'
	)
	const historyListEl = getElement<HTMLElement>(container, '#history-list')

	let historyDialogOpen = false

	const closeHistoryDialog = (): void => {
		historyDialog.classList.remove('open')
		historyDialogOpen = false
	}

	const renderHistoryList = (): void => {
		const historyList = getHistoryList()
		const entries = Object.entries(historyList)
		historyListEl.innerHTML = ''

		if (!entries.length) {
			const empty = doc.createElement('div')
			empty.className = 'history-empty'
			empty.textContent = 'No chat history yet.'
			historyListEl.appendChild(empty)
			return
		}

		entries.forEach(([chatID, chatTitle]) => {
			const item = doc.createElement('div')
			item.className = 'history-item'
			item.innerHTML = `
<span class="history-item-title" title="${chatTitle}">${chatTitle || 'Untitled chat'}</span>
<div class="history-item-actions">
<button class="history-item-btn open" type="button" title="Open chat">open</button>
<button class="history-item-btn delete" type="button" title="Delete chat">delete</button>
</div>
`

			const openBtn = item.querySelector<HTMLButtonElement>('.history-item-btn.open')
			const deleteBtn = item.querySelector<HTMLButtonElement>('.history-item-btn.delete')

			openBtn?.addEventListener('click', async () => {
				const messages = await retrieveChatHistory(chatID)
				onHistorySelected(messages)
				closeHistoryDialog()
			})

			deleteBtn?.addEventListener('click', async () => {
				await deleteChatHistory(chatID)
				renderHistoryList()
			})

			historyListEl.appendChild(item)
		})
	}

	const openHistoryDialog = (): void => {
		renderHistoryList()
		historyDialog.classList.add('open')
		historyDialogOpen = true
	}

	historyBtn.onclick = openHistoryDialog
	historyCloseBtn.onclick = closeHistoryDialog

	doc.addEventListener('click', event => {
		if (
			historyDialogOpen &&
			event.target instanceof Element &&
			event.target.id === 'history-dialog'
		) {
			closeHistoryDialog()
		}
	})
}
