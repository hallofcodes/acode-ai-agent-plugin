import { ChatMessage } from '../../panel/types'
import {
	CHAT_HISTORY_KEYS,
	CHAT_HISTORY_STORE,
	EDITED_FILE_HISTORY_STORE,
	LAST_ACTIVE_CHAT_HISTORY_KEY,
	RUTEX_DB_NAME,
	RUTEX_DB_VERSION
} from '../../configs/constants'
import { OldEditedFileLines } from '../tools/functions/types'

let currentChatID: string = ''

let rutexDB: Promise<IDBDatabase> | null = null

type ChatHistoryRecord = {
	id: string
	messages: ChatMessage[]
}

type EditedFileHistoryRecord = {
	id: string
	content: OldEditedFileLines[]
	filePath: string
	createdAt: number
	chatHistoryId: string
}

// --- CHECKING hasLocalStorage() IS USELESS SINCE localStorage IS ALWAYS AVAILABLE IN ACODE ---

export type HistoryList = Record<string, string>

const initializeRutexDB = (): Promise<IDBDatabase> => {
	if (rutexDB) return rutexDB

	rutexDB = new Promise((resolve, reject) => {
		const request = indexedDB.open(RUTEX_DB_NAME, RUTEX_DB_VERSION)

		request.onupgradeneeded = () => {
			const db = request.result

			if (!db.objectStoreNames.contains(CHAT_HISTORY_STORE)) {
				db.createObjectStore(CHAT_HISTORY_STORE, { keyPath: 'id' })
			}

			let store: IDBObjectStore

			if (!db.objectStoreNames.contains(EDITED_FILE_HISTORY_STORE)) {
				store = db.createObjectStore(EDITED_FILE_HISTORY_STORE, { keyPath: 'id' })
			} else {
				store = request.transaction!.objectStore(EDITED_FILE_HISTORY_STORE)
			}

			if (!store.indexNames.contains('filePath')) {
				store.createIndex('filePath', 'filePath', { unique: false })
			}

			if (!store.indexNames.contains('chatHistoryId')) {
				store.createIndex('chatHistoryId', 'chatHistoryId', { unique: false })
			}

			if (!store.indexNames.contains('chat_file')) {
				store.createIndex('chat_file', ['chatHistoryId', 'filePath'], {
					unique: false
				})
			}
		}

		request.onsuccess = () => {
			const db = request.result
			db.onversionchange = () => {
				db.close()
				rutexDB = null
			}
			resolve(db)
		}

		request.onerror = () => {
			rutexDB = null
			reject(request.error)
		}
	})

	return rutexDB
}



const withStore = async <T>(
	mode: IDBTransactionMode,
	storeName: 'chat_histories' | 'edited_histories',
	handler: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> => {
	const db = await initializeRutexDB()

	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, mode)
		const store = tx.objectStore(storeName)
		const request = handler(store)

		request.onsuccess = () => resolve(request.result)
		request.onerror = () => reject(request.error)
		tx.onerror = () => reject(tx.error)
		tx.onabort = () => reject(tx.error)
	})
}


export const getHistoryList = (): HistoryList => {
	try {
		return JSON.parse(
			localStorage.getItem(CHAT_HISTORY_KEYS) || '{}'
		) as HistoryList
	} catch {
		return {} as HistoryList
	}
}

export function editChatHistoryList(historyList: (lists: HistoryList) => void) {
	const history = getHistoryList()
	historyList(history)
	localStorage.setItem(CHAT_HISTORY_KEYS, JSON.stringify(history))
}

export const newChatHistory = () => {
	currentChatID = ''
	localStorage.removeItem(LAST_ACTIVE_CHAT_HISTORY_KEY)
}

export const getCurrentChatID = () => currentChatID

export const saveChatHistory = async (messages: ChatMessage[]) => {
	if (currentChatID === '') {
		const chatName = messages[0]?.text.substring(0, 25)
		currentChatID = crypto.randomUUID()

		localStorage.setItem(LAST_ACTIVE_CHAT_HISTORY_KEY, currentChatID)
		editChatHistoryList(lists => (lists[currentChatID] = chatName))
	}

	try {
		await withStore('readwrite', CHAT_HISTORY_STORE, store =>
			store.put({ id: currentChatID, messages } as ChatHistoryRecord)
		)
	} catch { }
}

export const retrieveChatHistory = async (chatID: string | null = null): Promise<ChatMessage[]> => {
	if (chatID) {
		currentChatID = chatID
		localStorage.setItem(LAST_ACTIVE_CHAT_HISTORY_KEY, currentChatID)
	} else if (currentChatID == '') {
		currentChatID = localStorage.getItem(LAST_ACTIVE_CHAT_HISTORY_KEY) || ''
	}

	if (currentChatID === '') return []

	try {
		const record = await withStore('readonly', CHAT_HISTORY_STORE, store =>
			store.get(currentChatID)
		)
		return (record as ChatHistoryRecord | undefined)?.messages || []
	} catch {
		return [] as ChatMessage[]
	}
}

export const deleteChatHistory = async (chatID: string | null = null) => {
	if (!chatID) chatID = currentChatID
	if (chatID == '') return

	if (chatID === currentChatID) currentChatID = ''

	try {
		await deleteEditedFileHistory({ chatHistoryId: chatID })
		await withStore('readwrite', CHAT_HISTORY_STORE, store => store.delete(chatID))
		editChatHistoryList(lists => delete lists[chatID])
	} catch { }
}

export const deleteAllChatHistory = async () => {
	try {
		await withStore('readwrite', CHAT_HISTORY_STORE, store => store.clear())
		await deleteEditedFileHistory(null)

		// --- Clear the history list and reset current chat ID ---
		editChatHistoryList(lists => {
			lists = {}
		})

		currentChatID = ''
	} catch { }
}



// --- IMPLEMENTATION FOR EDITED FILE HISTORY ---

export const saveEditedFileHistory = async (content: OldEditedFileLines[], filePath: string, chatHistoryId: string): Promise<string> => {
	const id = crypto.randomUUID()

	try {
		await withStore('readwrite', EDITED_FILE_HISTORY_STORE, store =>
			store.put({ id, content, filePath, chatHistoryId, createdAt: Date.now() } as EditedFileHistoryRecord)
		)
	} catch { }

	return id
}

export const retrieveEditedFileHistory = async (filter: { ids: string[] } | { filePath: string }): Promise<EditedFileHistoryRecord[]> => {
	try {
		if ('ids' in filter) {
			const results = await Promise.all(
				filter.ids.map(id =>
					withStore('readonly', EDITED_FILE_HISTORY_STORE, store =>
						store.get(id)
					)
				)
			)

			return results as EditedFileHistoryRecord[]
		}
		
		if ('filePath' in filter) {
			const results = await withStore('readonly', EDITED_FILE_HISTORY_STORE, store => {
				const index = store.index('filePath')
				return index.getAll(filter.filePath)
			})

			return results as EditedFileHistoryRecord[]
		}

	} catch {
		return []
	}
}

export type DeleteEditedFileHistoryFilter =
	{ chatHistoryId: string } |
	{ id: string } |
	null

/**
 * Delete edited file history records. If `deleteBy` is not provided, it will delete all edited file history. If `deleteBy` contains `chatHistoryId`, it will delete all edited file history related to that chat history. If `deleteBy` contains `id`, it will delete the specific edited file history record with that id.
 * @param deleteBy - The criteria to delete edited file history records.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteEditedFileHistory = async (deleteBy: DeleteEditedFileHistoryFilter = null): Promise<void> => {
	try {

		// delete everything
		if (!deleteBy) {
			await withStore('readwrite', EDITED_FILE_HISTORY_STORE, store =>
				store.clear()
			)
			return
		}

		// delete by chatHistoryId (requires index)
		if ('chatHistoryId' in deleteBy) {
			await withStore('readwrite', EDITED_FILE_HISTORY_STORE, store => {
				const index = store.index('chatHistoryId')
				const request = index.openCursor(deleteBy.chatHistoryId)

				request.onsuccess = () => {
					const cursor = request.result
					if (cursor) {
						cursor.delete()
						cursor.continue()
					}
				}

				return request
			})
			return
		}

		// --- Delete by id ---
		if ('id' in deleteBy) {
			await withStore('readwrite', EDITED_FILE_HISTORY_STORE, store =>
				store.delete(deleteBy.id)
			)
		}
	} catch { }
}
