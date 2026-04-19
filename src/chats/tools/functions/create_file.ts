import { CreateFileInfo } from './types'
import { getRelativePath } from './utils'

export default async function* ({ path, content = '' }: CreateFileInfo) {
	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)

	const toolCalling = JSON.stringify({
		header: `FILE CREATED: ${relativePath}`
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (exists) {
		throw new Error('Specified path already exists.')
	}

	const dirPath = path.substring(0, path.lastIndexOf('/'))
	const filename = path.substring(path.lastIndexOf('/') + 1)

	const dirExists = await fs(dirPath)?.exists()

	if (!dirExists) throw new Error('Directory path does not exist.')

	const result = await fs(dirPath).createFile(filename, content)

	acode.newEditorFile(filename, { render: true, uri: path })

	yield { result, toSave }
}
