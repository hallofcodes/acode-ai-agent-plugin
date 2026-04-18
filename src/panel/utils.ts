export const doc: { document: Document } = {
	document: document
}

export const escapeHtml = (
	value: string,
	includeNL: boolean = false
): string => {
	const pre = doc.document.createElement('pre')
	pre.textContent = value
	let content = pre.innerHTML

	if (includeNL)
		content = content.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>')
	return content
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

export function copyText(
	text: string,
	button?: HTMLButtonElement | null,
	doc: Document = document
): void {
	const textToCopy = text.replace(
		/<tool_calling_used>[\s\S]*?<\/tool_calling_used>/gi,
		'\n'
	)

	const done = (): void => {
		if (!button) return
		const original = button.innerHTML
		button.innerHTML =
			'<svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> copied!'
		button.classList.add('copied')
		setTimeout(() => {
			button.innerHTML = original
			button.classList.remove('copied')
		}, 1800)
	}

	const fallbackCopy = (): void => {
		const textarea = Object.assign(doc.createElement('textarea'), {
			value: textToCopy
		})
		textarea.style.cssText = 'position:fixed;opacity:0'
		doc.body.appendChild(textarea)
		textarea.select()
		doc.execCommand('copy')
		textarea.remove()
		done()
	}

	if (navigator.clipboard) {
		navigator.clipboard.writeText(textToCopy).then(done).catch(fallbackCopy)
	} else {
		fallbackCopy()
	}
}

export const stripTrailingDetailsBlock = (text: string): string => {
	const trimmedEnd = text.replace(/\s+$/g, '')
	const closeTag = '</details>'
	const lower = trimmedEnd.toLowerCase()
	const closeIndex = lower.lastIndexOf(closeTag)

	if (closeIndex < 0 || closeIndex + closeTag.length !== trimmedEnd.length) {
		return text
	}

	const openIndex = lower.lastIndexOf('<details', closeIndex)
	if (openIndex < 0) return text

	return trimmedEnd.slice(0, openIndex).trimEnd()
}
