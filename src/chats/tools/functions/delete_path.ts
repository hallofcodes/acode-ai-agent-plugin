import { CreateFileInfo } from './types'
import { getRelativePath } from './utils'

export default async function* ({ path, content = '' }: CreateFileInfo) {
	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (!exists) {
		throw new Error('Specified path does not exists.')
	}

	const fileInfo = await fs(path).stat()

	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)

	const result = `${
		fileInfo.isFile ? 'FILE' : 'DIRECTORY'
	} DELETED: ${relativePath}`

	const toolCalling = JSON.stringify({
		header: result
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	await fs(path).delete()

	yield { result, toSave }
}
