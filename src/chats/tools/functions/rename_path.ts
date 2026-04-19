import { RenameFileInfo } from './types'
import { getRelativePath } from './utils'

export default async function* ({ path, new_name }: RenameFileInfo) {
	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)

	const toolCalling = JSON.stringify({
		header: `RENAMED: ${relativePath} -> ${new_name}`
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (!exists) {
		throw new Error('Specified path does not exist.')
	}

	const result = await fs(path).renameTo(new_name)

	yield { result, toSave }
}
