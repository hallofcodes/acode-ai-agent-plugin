export const renderMarkdown = (
	raw: string,
	escapeHtml: (value: string) => string
): string => {
	let h = escapeHtml(raw)

	h = h.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang: string, code: string) => {
		const language = lang || 'code'
		const encoded = btoa(unescape(encodeURIComponent(code.trimEnd())))
		return `<div class="code-block">
      <div class="code-header">
         <span class="code-lang">${escapeHtml(language)}</span>
         <button class="code-btn copy-code-btn" data-enc="${encoded}">
            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>copy
         </button>
      </div>
      <div class="code-body">${escapeHtml(code.trimEnd())}</div>
   </div>`
	})

	h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>')
	h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>')
	h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>')

	h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
	h = h.replace(/\*(.+?)\*/g, '<em>$1</em>')
	h = h.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')

	h = h.replace(/((?:^[-*] .+(?:\n|$))+)/gm, block => {
		const items = block
			.trim()
			.split('\n')
			.map((line: string) => `<li>${line.replace(/^[-*] /, '')}</li>`)
			.join('')
		return `<ul>${items}</ul>`
	})

	h = h.replace(/((?:^\d+\. .+(?:\n|$))+)/gm, block => {
		const items = block
			.trim()
			.split('\n')
			.map((line: string) => `<li>${line.replace(/^\d+\. /, '')}</li>`)
			.join('')
		return `<ol>${items}</ol>`
	})

	h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>')
	h = h.replace(/\n{2,}/g, '</p><p>')
	h = h.replace(/\n/g, '<br>')
	h = `<p>${h}</p>`

	h = h.replace(/<p>(<(?:div|ul|ol|h[1-3]|blockquote))/g, '$1')
	h = h.replace(/((?:div|ul|ol|h[1-3]|blockquote)>)<\/p>/g, '$1')
	h = h.replace(
		/<p>\s*(<div class="code-block">[\s\S]*?<\/div>)\s*<\/p>/g,
		'$1'
	)
	h = h.replace(/<br>\s*(<div class="code-block">)/g, '$1')
	h = h.replace(/(<\/div>)\s*<br>/g, '$1')

	return h
}

export type EditedFileLines = Record<number, [string, boolean]>

export const renderEditedFileLines = (
	lines: EditedFileLines,
	escapeHtml: (value: string) => string
): string => {
	const entries = Object.entries(lines)
		.map(([lineNumber, value]) => ({
			lineNumber: Number(lineNumber),
			text: value?.[0] ?? '',
			isAdded: Boolean(value?.[1])
		}))
		.filter(entry => Number.isFinite(entry.lineNumber))
		.sort((a, b) => a.lineNumber - b.lineNumber)

	const rows = entries
		.map(entry =>
			[
				`<div class="edited-line ${entry.isAdded ? 'added' : 'removed'}">`,
				`<span class="edited-line-number">${escapeHtml(String(entry.lineNumber))}</span>`,
				`<span class="edited-line-prefix">${entry.isAdded ? '+' : '-'}</span>`,
				`<span class="edited-line-text">${escapeHtml(entry.text)}</span>`,
				'</div>'
			].join('')
		)
		.join('')

	return [
		'<div class="code-block edited-lines-block">',
		'<div class="code-header"><span class="code-lang">edited lines</span></div>',
		`<div class="code-body edited-lines-body">${rows}</div>`,
		'</div>'
	].join('')
}
