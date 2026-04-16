
interface ListFilesInfo {
	path: string
}

export default async function ({ path }: ListFilesInfo) {
	try {
		const fs = acode.require('fs')
		const entries = await fs(path).lsDir()

		if (!entries) {
			throw new Error('Directory path is invalid or inaccessible.')
		}

		const result = entries.map((entry: Acode.File) => {
			if (entry.url.startsWith(path)) {
				return entry.url.slice(path.length)
			}

			return entry.url
		}).join(' | ')

		let relativePath = path

		for (const folder of window.addedFolder || []) {
			if (path.startsWith(folder.url)) {
				relativePath = `[${folder.title}] /${path.slice(folder.url.length)}`
			}
		}

		const toolCalling = JSON.stringify({
			header: `VIEWED: ${relativePath}`,
		})

		const toSave = `<tool_calling>${toolCalling}</tool_calling>`

		return { result, toSave }

	} catch (error: any) {
		return { result: error instanceof Error ? error.message : 'Unknown error occurred while listing directory.', toSave: null }
	}
}
