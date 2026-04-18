import { escapeHtml } from './utils'
import { renderEditedFileLines } from './markdown'
import { DisplayToolsCallUsed } from '../chats/tools/functions/types'
import { retrieveEditedFileHistory } from '../chats/history/chatHistory'

const TOOL_TAG_REGEX = /<tool_calling_used>([\s\S]*?)<\/tool_calling_used>/gi

export async function processSingleToolCallTag(tagText: string): Promise<string> {
	const match = /<tool_calling_used>([\s\S]*?)<\/tool_calling_used>/i.exec(
		tagText
	)
	if (!match) return tagText

	const payload = (match[1] || '').trim()
	try {
		const parsedCommand = JSON.parse(payload)
		return await convertToolCallsToHTML(parsedCommand as DisplayToolsCallUsed)
	} catch {
		return escapeHtml(tagText)
	}
}

export async function processToolCallsInText(text: string): Promise<string> {
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
		const result = await processSingleToolCallTag(fullMatch)
		out += result

		lastIndex = end
	}

	// Keep trailing text
	out += text.slice(lastIndex)
	return out
}

async function convertToolCallsToHTML(command: DisplayToolsCallUsed): Promise<string> {
	if ('header' in command) {
		return `<div class="code-block">
               <div class="code-header">
                  <span class="code-lang edited">${escapeHtml(
							command.header
						)}</span>
               </div>
             </div>`
	}

	if ('path' in command && command.editedFileHistoryId) {
		const result = await retrieveEditedFileHistory({ ids: [command.editedFileHistoryId] })

		if (!result.length) return ''

		return renderEditedFileLines(result[0].content, command.path)
	}

	return ''
}
