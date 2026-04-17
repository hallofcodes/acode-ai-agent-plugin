import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { escapeHtml } from './utils'
import { processSingleToolCallTag } from './commandParser'
import { OldEditedFileLines } from '../chats/tools/functions/types'

const TOOL_TAG_REGEX = /<tool_calling_used>[\s\S]*?<\/tool_calling_used>/gi

hljs.registerLanguage('bash', bash as any)
hljs.registerLanguage('sh', bash as any)
hljs.registerLanguage('shell', bash as any)
hljs.registerLanguage('css', css as any)
hljs.registerLanguage('js', javascript as any)
hljs.registerLanguage('javascript', javascript as any)
hljs.registerLanguage('json', json as any)
hljs.registerLanguage('md', markdown as any)
hljs.registerLanguage('markdown', markdown as any)
hljs.registerLanguage('php', php as any)
hljs.registerLanguage('py', python as any)
hljs.registerLanguage('python', python as any)
hljs.registerLanguage('ts', typescript as any)
hljs.registerLanguage('typescript', typescript as any)
hljs.registerLanguage('html', xml as any)
hljs.registerLanguage('xml', xml as any)

const escapeHtml2 = (value: string): string => {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}
	return value.replace(/[&<>"']/g, char => map[char])
}

const normalizeLanguage = (lang: string): string => {
	const lower = lang.trim().toLowerCase()
	if (!lower) return 'code'
	if (lower === 'sh' || lower === 'shell') return 'bash'
	if (lower === 'js') return 'javascript'
	if (lower === 'ts') return 'typescript'
	if (lower === 'md') return 'markdown'
	if (lower === 'py') return 'python'
	return lower
}

const renderInlineMarkdown = (text: string): string => {
	let h = escapeHtml2(text)
	h = h.replace(/``([^`\n]+)``/g, '<code>$1</code>')
	h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>')
	h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
	h = h.replace(/\*(.+?)\*/g, '<em>$1</em>')
	return h
}

const renderMarkdownBlock = (block: string): string => {
	const lines = block.split('\n')
	const output: string[] = []
	let listType: 'ul' | 'ol' | null = null
	let listItems: string[] = []

	const flushList = (): void => {
		if (!listType || !listItems.length) return
		output.push(`<${listType}>${listItems.join('')}</${listType}>`)
		listType = null
		listItems = []
	}

	for (const rawLine of lines) {
		const line = rawLine.trimEnd()
		const trimmed = line.trim()

		if (!trimmed) {
			flushList()
			continue
		}

		const headingMatch = /^(#{1,3})\s+(.+)$/.exec(trimmed)
		if (headingMatch) {
			flushList()
			const level = headingMatch[1].length
			output.push(
				`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`
			)
			continue
		}

		const blockquoteMatch = /^>\s+(.+)$/.exec(trimmed)
		if (blockquoteMatch) {
			flushList()
			output.push(
				`<blockquote>${renderInlineMarkdown(
					blockquoteMatch[1]
				)}</blockquote>`
			)
			continue
		}

		const unorderedMatch = /^[-*]\s+(.+)$/.exec(trimmed)
		if (unorderedMatch) {
			if (listType !== 'ul') flushList()
			listType = 'ul'
			listItems.push(`<li>${renderInlineMarkdown(unorderedMatch[1])}</li>`)
			continue
		}

		const orderedMatch = /^\d+\.\s+(.+)$/.exec(trimmed)
		if (orderedMatch) {
			if (listType !== 'ol') flushList()
			listType = 'ol'
			listItems.push(`<li>${renderInlineMarkdown(orderedMatch[1])}</li>`)
			continue
		}

		flushList()
		output.push(`<p>${renderInlineMarkdown(trimmed)}</p>`)
	}

	flushList()
	return output.join('')
}

const renderMarkdownBlockWithToolCalls = (block: string): string => {
	const matches = [...block.matchAll(TOOL_TAG_REGEX)]
	if (!matches.length) return renderMarkdownBlock(block)

	let out = ''
	let lastIndex = 0

	for (const match of matches) {
		const fullMatch = match[0]
		const start = match.index ?? 0
		const end = start + fullMatch.length

		const before = block.slice(lastIndex, start)
		if (before) out += renderMarkdownBlock(before)

		// Keep tool payload unescaped and replace tag with generated HTML.
		out += processSingleToolCallTag(fullMatch)
		lastIndex = end
	}

	const tail = block.slice(lastIndex)
	if (tail) out += renderMarkdownBlock(tail)

	return out
}

export const renderMarkdown = (raw: string): string => {
	const parts: string[] = []
	const fenceRegex = /```(\w*)\n([\s\S]*?)```/g
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = fenceRegex.exec(raw)) !== null) {
		const before = raw.slice(lastIndex, match.index)
		if (before.trim()) {
			parts.push(renderMarkdownBlockWithToolCalls(before))
		}

		const language = normalizeLanguage(match[1] || 'code')
		const code = match[2].replace(/\n$/, '').trimEnd()
		const encoded = btoa(unescape(encodeURIComponent(code)))

		let highlighted = code
		try {
			highlighted = hljs.getLanguage(language)
				? hljs.highlight(code, { language }).value
				: hljs.highlightAuto(code).value
		} catch {
			highlighted = escapeHtml2(code)
		}

		parts.push(`
         <div class="code-block">
            <div class="code-header">
               <span class="code-lang">${escapeHtml2(language)}</span>
               <button class="code-btn copy-code-btn" data-enc="${encoded}">
                  <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>copy
               </button>
            </div>
            <div class="code-body">${highlighted}</div>
         </div>`)

		lastIndex = match.index + match[0].length
	}

	const tail = raw.slice(lastIndex)
	if (tail.trim()) {
		parts.push(renderMarkdownBlockWithToolCalls(tail))
	}

	return parts.join('')
}

export const renderEditedFileLines = (
	lines: OldEditedFileLines[],
	editedFilePath: string
): string => {
	lines.sort((a, b) => a.line - b.line)

	const groups = new Map<number, OldEditedFileLines[]>()

	for (const entry of lines) {
		if (!groups.has(entry.line)) groups.set(entry.line, [])
		groups.get(entry.line)!.push(entry)
	}

	const uniqueLines = [...groups.keys()].sort((a, b) => a - b)
	const entries: OldEditedFileLines[] = []

	for (let i = 0; i < uniqueLines.length; ) {
		const start = i
		while (
			i + 1 < uniqueLines.length &&
			uniqueLines[i + 1] === uniqueLines[i] + 1
		) {
			i++
		}

		const blockLines = uniqueLines.slice(start, i + 1)

		// For consecutive line blocks, show removals first then additions.
		if (blockLines.length > 1) {
			for (const line of blockLines) {
				for (const entry of groups.get(line) || []) {
					if (!entry.isAdded) entries.push(entry)
				}
			}
			for (const line of blockLines) {
				for (const entry of groups.get(line) || []) {
					if (entry.isAdded) entries.push(entry)
				}
			}
		} else {
			entries.push(...(groups.get(blockLines[0]) || []))
		}

		i++
	}

	const filePaths = editedFilePath.split('.')
	const fileExt = filePaths[filePaths.length - 1] ?? 'code'
	const language = normalizeLanguage(fileExt)
	const getLanguage = hljs.getLanguage(language)

	const highlight = (code: string) => {
		let highlighted = ''
		try {
			highlighted = getLanguage
				? hljs.highlight(code, { language }).value
				: hljs.highlightAuto(code).value
		} catch {
			highlighted = escapeHtml2(code)
		}
		
		return highlighted
	}

	const rows = entries
		.map(entry =>
			[
				`<div class="edited-line ${entry.isAdded ? 'added' : 'removed'}">`,
				`<span class="edited-line-number">${entry.line}</span>`,
				`<span class="edited-line-prefix">${
					entry.isAdded ? '+' : '-'
				}</span>`,
				`<span class="edited-line-text">${highlight(entry.text)}</span>`,
				'</div>'
			].join('')
		)
		.join('')

	return [
		'<div class="code-block edited-lines-block">',
		`<div class="code-header edited-h"><span class="code-lang edited">EDITED: ${escapeHtml(
			editedFilePath
		)}</span></div>`,
		`<div class="code-body edited-lines-body">${rows}</div>`,
		'</div>'
	].join('')
}
