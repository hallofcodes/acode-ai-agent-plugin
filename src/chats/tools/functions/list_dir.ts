import { ListDirInfo, ToolsReturnType } from './types'
import { getRelativePath } from './utils'

export default async function* ({
	path
}: ListDirInfo): AsyncGenerator<ToolsReturnType> {
	try {
		// --- SEND SIGNAL TO PANEL THAT DIRECTORY IS LISTING ---
		const relativePath = getRelativePath(path)

		const toolCalling = JSON.stringify({
			header: `VIEWED: ${relativePath}`
		})

		const toSave = `<tool_calling_used>${toolCalling}</tool_calling_used>`
		yield { toSave }

		// --- START FILE READ ---
		const fs = acode.require('fs')
		const entries = await fs(path).lsDir()

		if (!entries) {
			throw new Error('Directory path is invalid or inaccessible.')
		}

		const result = entries
			.map((entry: Acode.File) => {
				if (entry.url.startsWith(path)) {
					return entry.url.slice(path.length)
				}

				return entry.url
			})
			.join(' | ')

		yield { result }
	} catch (error: any) {
		throw error
	}
}
