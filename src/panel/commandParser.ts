import { escapeHtml } from './utils'
import { renderEditedFileLines } from './markdown'

const TOOL_TAG_REGEX = /<tool_calling_used>([\s\S]*?)<\/tool_calling_used>/gi

export function processSingleToolCallTag(tagText: string): string {
	const match = /<tool_calling_used>([\s\S]*?)<\/tool_calling_used>/i.exec(
		tagText
	)
	if (!match) return tagText

	const payload = (match[1] || '').trim()
	try {
		const parsedCommand = JSON.parse(payload)
		return convertToolCallsToHTML(parsedCommand)
	} catch {
		return escapeHtml(tagText)
	}
}

export function processToolCallsInText(text: string): string {
	const matches = [...text.matchAll(TOOL_TAG_REGEX)]
	if (!matches.length) return text

	let out = ''
	let lastIndex = 0

	for (const match of matches) {
		const fullMatch = match[0]
		const start = match.index ?? 0
		const end = start + fullMatch.length

		// Keep text before this tag
		out += text.slice(lastIndex, start)

		// Replace this tag with command result
		const result = processSingleToolCallTag(fullMatch)
		out += result

		lastIndex = end
	}

	// Keep trailing text
	out += text.slice(lastIndex)
	return out
}

function convertToolCallsToHTML(command: Record<string, any>): string {
	if (command.header) {
		return `<div class="code-block">
               <div class="code-header">
                  <span class="code-lang edited">${escapeHtml(
							command.header
						)}</span>
               </div>
             </div>`
	}

	if (command.path && command.body) {
		return renderEditedFileLines(command.body, command.path)
	}

	return ''
}
