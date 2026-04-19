export const getRelativePath = (
	path: string,
	showWorkspaceTitle: boolean = true
): string => {
	let relativePath = path

	for (const folder of window.addedFolder || []) {
		if (path.startsWith(folder.url)) {
			relativePath = showWorkspaceTitle ? `[${folder.title}] /` : `/`
			relativePath += path.slice(folder.url.length)
			break
		}
	}

	return relativePath
}
