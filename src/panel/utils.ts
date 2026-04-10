export const escapeHtml = (doc: Document, value: string): string => {
	const pre = doc.createElement('pre')
	pre.textContent = value
	return pre.innerHTML
}

export const decodeBase64Safe = (value: string): string => {
	try {
		return decodeURIComponent(escape(atob(value)))
	} catch {
		return ''
	}
}

export const getElement = <T extends Element>(
	root: ParentNode,
	selector: string
): T => {
	const found = root.querySelector(selector)
	if (!found) {
		throw new Error(`Missing element: ${selector}`)
	}
	return found as T
}

export const getFileNameFromPath = (path: string): string => {
	if (!path) return ''
	const parts = path.split(/[\\/]/)
	return parts[parts.length - 1] || path
}
