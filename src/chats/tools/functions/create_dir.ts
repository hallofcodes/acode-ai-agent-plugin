import { CreateDirInfo } from './types'
import { getRelativePath } from './utils'

export default async function* ({ path }: CreateDirInfo) {
	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)

	const toolCalling = JSON.stringify({
		header: `FOLDER CREATED: ${relativePath}`
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (exists) {
		throw new Error('Specified path already exists.')
	}

	const parentDir = path.substring(0, path.lastIndexOf('/'))
	const dirName = path.substring(path.lastIndexOf('/') + 1)

	const dirExists = await fs(parentDir).exists()

	if (!dirExists) throw new Error('Parent directory path does not exist.')

	const result = await fs(parentDir).createDirectory(dirName)

	yield { result, toSave }
}
