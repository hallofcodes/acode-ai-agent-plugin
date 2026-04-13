import { hasLocalStorage } from '../settings'
import { ChatMessage } from '../../panel/types'
import {
	CHAT_HISTORY_PREFIX,
	LAST_ACTIVE_CHAT_HISTORY_KEY
} from '../../configs/constants'

let currentChatID: string = ''

export type HistoryList = Record<string, string>

export const getHistoryList = (): HistoryList => {
	try {
		return JSON.parse(
			localStorage.getItem(CHAT_HISTORY_PREFIX) || '{}'
		) as HistoryList
	} catch {
		return {} as HistoryList
	}
}

export function editChatHistoryList(historyList: (lists: HistoryList) => void) {
	const history = getHistoryList()
	historyList(history)
	localStorage.setItem(CHAT_HISTORY_PREFIX, JSON.stringify(history))
}

export const newChatHistory = () => {
	currentChatID = ''
}

export const saveChatHistory = (messages: ChatMessage[]) => {
	if (!hasLocalStorage()) return

	if (currentChatID == '') {
		const chatName = messages[0]?.text.substring(0, 25)
		currentChatID = crypto.randomUUID()

		localStorage.setItem(LAST_ACTIVE_CHAT_HISTORY_KEY, currentChatID)
		editChatHistoryList(lists => (lists[currentChatID] = chatName))
	}

	localStorage.setItem(
		CHAT_HISTORY_PREFIX + currentChatID,
		JSON.stringify(messages)
	)
}

export const retrieveChatHistory = (): ChatMessage[] => {
	if (!hasLocalStorage()) return [] as ChatMessage[]

	if (currentChatID == '') {
		currentChatID = localStorage.getItem(LAST_ACTIVE_CHAT_HISTORY_KEY) || ''
	   clg('Reused chat ID:', currentChatID)
	}

	try {
		return JSON.parse(
			localStorage.getItem(CHAT_HISTORY_PREFIX + currentChatID) || '[]'
		) as ChatMessage[]
	} catch {
		return [] as ChatMessage[]
	}
}

export const deleteChatHistory = (chatID: string | null = null) => {
	if (!chatID) chatID = currentChatID
	if (chatID == '' || !hasLocalStorage()) return

	if (chatID === currentChatID) currentChatID = ''

	editChatHistoryList(lists => delete lists[chatID])
	localStorage.removeItem(CHAT_HISTORY_PREFIX + chatID)
}

export const deleteAllChatHistory = () => {
	if (!hasLocalStorage()) return

	editChatHistoryList(lists => {
		for (const chatID in lists) {
			localStorage.removeItem(CHAT_HISTORY_PREFIX + chatID)
		}
		lists = {}
	})
}
