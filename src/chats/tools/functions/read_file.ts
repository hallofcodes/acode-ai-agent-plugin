import { ReadFileInfo, ToolsReturnType } from './types'
import { getRelativePath } from './utils'

export default async function* ({
	path,
	start_line,
	end_line
}: ReadFileInfo): AsyncGenerator<ToolsReturnType> {
	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)

	const toolCalling = JSON.stringify({
		header: `READ: ${relativePath}:${start_line}-${end_line}`
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (!exists) {
		throw new Error('File does not exist.')
	}

	const content = await fs(path).readFile('utf-8')

	const lines = content.split('\n')

	const result = lines
		.slice(start_line - 1, end_line)
		.map((line, index) => `${start_line + index}: ${line}`)
		.join('\n')

	yield { result, toSave }
}
