import { openEditedFilesDialog } from '../../../panel/renderEditedFilesDialog'
import {
	getCurrentChatID,
	saveEditedFileHistory
} from '../../history/chatHistory'
import { CurrentEditedFiles } from '../../types'
import {
	DisplayToolsCallUsed,
	EditFileInfo,
	EditFileLines,
	OldEditedFileLines,
	ToolsReturnType
} from './types'
import { getRelativePath } from './utils'

export const currentEdittedFiles: CurrentEditedFiles = {}

export default async function* ({
	uri,
	lines
}: EditFileInfo): AsyncGenerator<ToolsReturnType> {
	const fs = acode.require('fs')
	const fsPath = fs(uri)

	const exists = await fsPath?.exists()

	if (!exists) {
		throw new Error('File does not exist.')
	}

	let openFile = editorManager.files.find(f => f.uri === uri)

	if (openFile && openFile.readOnly) throw new Error('File is readonly')

	if (!openFile) {
		const filename = uri.substring(uri.lastIndexOf('/') + 1)
		openFile = acode.newEditorFile(filename, { uri, render: true })
	} else openFile.makeActive()

	try {
		if (openFile) openFile.markChanged = false

		// --- 1. Sort so the highest line numbers come first ---
		lines.sort((a: EditFileLines, b: EditFileLines) => b.line - a.line)

		const newLines: OldEditedFileLines[] = []

		const content = await fsPath.readFile('utf-8')

		const contentLines = content.split('\n')

		let totalAdded = 0
		let totalRemoved = 0

		const rPath = getRelativePath(uri, false)
		currentEdittedFiles[rPath] ??= {
			type: 'edited',
			totalAdded: 0,
			totalRemoved: 0,
			editedHistoryIds: []
		}

		for (let index = 0; index < lines.length; index++) {
			const { line, text } = lines[index]

			// --- Requested line is always starting from 1 but array index starts from 0 ---
			const targetLine = line - 1

			// --- Mark as removed only if the line content has changed ---
			if (contentLines[targetLine].trimEnd() !== text.trimEnd()) {
				const buildOldContentLines = {
					line,
					text: contentLines[targetLine],
					isAdded: false,
					revertable: true
				}
				newLines.push(buildOldContentLines)

				// delete, so only one line object shows which is removed line
				totalRemoved++
				currentEdittedFiles[rPath].totalRemoved++
			}

			if (text === '') {
				// Because we sorted descending, deleting this line
				// doesn't shift the indices of the lines we still need to process.
				contentLines.splice(targetLine, 1)
				continue
			}

			if (text.includes('\n')) {
				// Insert multiple lines at the target position
				const additions = text.split('\n')
				contentLines.splice(targetLine, 1, ...additions)

				// --- And replace it with each line for each object ---
				for (let i = 0; i < additions.length; i++) {
					const buildNewContentLines = {
						line: line + i,
						text: additions[i],
						isAdded: true,
						revertable: i == 0 ? false : true
					}
					newLines.push(buildNewContentLines)

					totalAdded++
					currentEdittedFiles[rPath].totalAdded++
				}
			} else {
				// Standard single line update or insertion
				contentLines[targetLine] = text

				newLines.push({
					line,
					text,
					isAdded: true
				})

				totalAdded++
				currentEdittedFiles[rPath].totalAdded++
			}
		}

		// --- Save the file ---
		const newContent = contentLines.join('\n')

		await fsPath.writeFile(newContent)

		if (openFile) {
			const session = openFile.session

			// Get the last row index
			const lastRow = session.getLength() - 1
			// Get the character count of the last line
			const lastColumn = session.getLine(lastRow).length

			// Replace everything from start to the actual end
			session.replace(
				{
					start: { row: 0, column: 0 },
					end: { row: lastRow, column: lastColumn }
				},
				newContent
			)
		}

		// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
		const relativePath = getRelativePath(uri)
		const id = await saveEditedFileHistory(newLines, uri, getCurrentChatID())

		currentEdittedFiles[rPath].editedHistoryIds.push(id)

		openEditedFilesDialog()

		const toolCalling = JSON.stringify({
			path: relativePath,
			editedFileHistoryId: id,
			totalAdded,
			totalRemoved,
		} as DisplayToolsCallUsed)

		const toSave = `<display_ui>${toolCalling}</display_ui>`

		yield {
			result: `[EDITED] +${totalAdded} -${totalRemoved}`,
			toSave
		}
	} finally {
		if (openFile) {
			openFile.markChanged = true
		}
	}
}
