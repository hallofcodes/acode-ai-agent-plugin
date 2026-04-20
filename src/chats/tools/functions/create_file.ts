import { openEditedFilesDialog } from '../../../panel/renderEditedFilesDialog'
import { currentEdittedFiles } from './edit_file'
import { CreateFileInfo } from './types'
import { getRelativePath } from './utils'

export default async function* ({ uri, content = '' }: CreateFileInfo) {
	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(uri)

	const toolCalling = JSON.stringify({
		header: `FILE CREATED: ${relativePath}`
	})
	const toSave = `<display_old_task_ui>${toolCalling}</display_old_task_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(uri)?.exists()

	if (exists) {
		throw new Error('Specified path already exists.')
	}

	const dirPath = uri.substring(0, uri.lastIndexOf('/'))
	const filename = uri.substring(uri.lastIndexOf('/') + 1)

	const dirExists = await fs(dirPath)?.exists()

	if (!dirExists) throw new Error('Directory path does not exist.')

	const result = await fs(dirPath).createFile(filename, content)

	acode.newEditorFile(filename, { render: true, uri })

	currentEdittedFiles[uri] ??= {
		type: 'created',
		totalAdded: content.split('\n').length,
		totalRemoved: 0,
		editedHistoryIds: []
	}

	openEditedFilesDialog()

	yield { result, toSave }
}
