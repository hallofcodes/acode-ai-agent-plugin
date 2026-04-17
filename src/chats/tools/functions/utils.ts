export const getRelativePath = (path: string): string => {
	let relativePath = path

	for (const folder of window.addedFolder || []) {
		if (path.startsWith(folder.url)) {
			relativePath = `[${folder.title}] /${path.slice(folder.url.length)}`
			break
		}
	}

	return relativePath
}
