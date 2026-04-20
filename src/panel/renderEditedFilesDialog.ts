import { retrieveEditedFileHistory } from '../chats/history/chatHistory'
import { currentEdittedFiles } from '../chats/tools/functions/edit_file'
import { OldEditedFileLines } from '../chats/tools/functions/types'
import { getRelativePath } from '../chats/tools/functions/utils'
import { doc, escapeHtml } from './utils'

export function openEditedFilesDialog() {
	const dialog = doc.document.getElementById('edited-files-bar')
	const filesList = doc.document.getElementById('edited-files-list')

	if (!dialog || !filesList) return

	if (!dialog.classList.contains('opened')) dialog.classList.add('opened')

	if (!Object.entries(currentEdittedFiles).length) {
		closeEditedFilesDialog()
	}

	for (const filePath in currentEdittedFiles) {
		const rPath = getRelativePath(filePath, false)
		const encodedPath = btoa(unescape(encodeURIComponent(filePath)))

		const fileInfo = currentEdittedFiles[filePath]
		const fileOption = filesList.querySelector(
			`.edited-file-option[data-file-path="${encodedPath}"]`
		)

		if (fileOption) {
			const addedSpan = fileOption.querySelector('.edited-file-added')
			const removedSpan = fileOption.querySelector('.edited-file-removed')

			if (addedSpan) addedSpan.textContent = `+${fileInfo.totalAdded}`
			if (removedSpan) removedSpan.textContent = `-${fileInfo.totalRemoved}`

			continue
		}

		const item = doc.document.createElement('div')
		item.setAttribute('data-file-path', encodedPath)
		item.className = 'edited-file-option'
		item.innerHTML = `
         <span class="edited-file-name">${escapeHtml(rPath)}</span>
         <span class="edited-file-added">+${fileInfo.totalAdded}</span>
         <span class="edited-file-removed">-${fileInfo.totalRemoved}</span>
         <button
            class="edited-file-action accept"
            type="button"
            title="Accept">
            <svg viewBox="0 0 24 24">
               <polyline points="20 6 9 17 4 12" />
            </svg>
         </button>
         <button
            class="edited-file-action reject"
            type="button"
            title="Reject">
            <svg viewBox="0 0 24 24">
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
         </button>
      `

		const acceptBtn = item.querySelector<HTMLButtonElement>('.accept')
		const rejectBtn = item.querySelector<HTMLButtonElement>('.reject')

		acceptBtn?.addEventListener('click', () => {
			item.remove()
			delete currentEdittedFiles[filePath]
			openEditedFilesDialog()
		})

		rejectBtn?.addEventListener('click', async () => {
			if (fileInfo.type === 'created') {
				const fs = acode.require('fs')
				await fs(filePath)?.delete()
				acceptBtn?.click()
				return
			}

			const editedFileHistoryIds =
				currentEdittedFiles[filePath].editedHistoryIds

			let historyRecords = await retrieveEditedFileHistory({
				ids: editedFileHistoryIds
			})
			historyRecords = historyRecords.reverse()

			for (const record of historyRecords) {
				revertEditedLines(record?.content ?? [], record.filePath)
			}

			acceptBtn?.click()
		})

		filesList.appendChild(item)
	}
}

export function closeEditedFilesDialog() {
	const dialog = doc.document.getElementById('edited-files-bar')
	const filesList = doc.document.getElementById('edited-files-list')

	if (!dialog || !filesList) return

	if (dialog.classList.contains('opened')) dialog.classList.remove('opened')
	filesList.innerHTML = ''
}

export function initializeEditedFilesDialogEvents(doc: Document) {
	const acceptAllBtn = doc.getElementById('accept-all-btn')
	const rejectAllBtn = doc.getElementById('reject-all-btn')

	acceptAllBtn?.addEventListener('click', () => {
		const allAcceptBtns = doc.document.querySelectorAll(
			'.edited-file-option .edited-file-action.accept'
		)
		allAcceptBtns.forEach(btn => (btn as HTMLButtonElement).click())
	})

	rejectAllBtn?.addEventListener('click', () => {
		const allRejectBtns = doc.document.querySelectorAll(
			'.edited-file-option .edited-file-action.reject'
		)
		allRejectBtns.forEach(btn => (btn as HTMLButtonElement).click())
	})
}

function revertEditedLines(history: OldEditedFileLines[], file: string) {
	// --- Reverse the array so we can start reverting the file edits right from the very last ---
	// --- Filter and remove edits we can't revert ---
	const reversedHistory = history.reverse().filter(entry => entry.revertable)
	clg('REVERT NOT YET IMPLEMENTED: CHECK THE HISTORY')
	clg('Revert history', reversedHistory)
}
