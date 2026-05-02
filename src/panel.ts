import panel from './panel.html'
import { ChatMessage as AgentChatMessage } from './chats/types'
import { renderMarkdown, renderEditedFileLines } from './panel/markdown'
import type { AIPanelAPI, ChatMessage, ContextFile } from './panel/types'
import {
	decodeBase64Safe,
	escapeHtml,
	doc,
	getElement,
	copyText,
	stripTrailingDetailsBlock
} from './panel/utils'
import { settingsContainer } from './panel/settingsContainer'
import { historyContainer } from './panel/historyContainer'
import {
	retrieveChatHistory,
	deleteChatHistory,
	saveChatHistory,
	newChatHistory
} from './chats/history/chatHistory'
import { sendChat } from './chats/handleAgents'
import {
	addLifetimeTokens,
	aiSettings,
	formatTokenNumber
} from './chats/settings'
import { processSingleToolCallTag } from './panel/commandParser'
import { getWorkspaceFolders, getActiveFiles } from './helpers/workspace'
import { OldEditedFileLines } from './chats/tools/functions/types'

declare global {
	interface Window {
		aiPanel?: AIPanelAPI
	}
}

const renderPanel = (container: HTMLElement): (() => void) => {
	container.style.padding = '0'
	container.innerHTML = panel

	doc.document = container.ownerDocument || document

	const createEl = <T extends keyof HTMLElementTagNameMap>(
		tag: T
	): HTMLElementTagNameMap[T] => doc.document.createElement(tag)

	container.style.display = 'flex'
	container.style.flexDirection = 'column'
	container.style.height = '100%'
	container.style.width = '100%'

	const msgsInner = getElement<HTMLElement>(container, '#msgs-inner')
	const msgsWrap = getElement<HTMLElement>(container, '#msgs-wrap')
	const emptyState = getElement<HTMLElement>(container, '#empty-state')
	const inputEl = getElement<HTMLTextAreaElement>(container, '#chat-input')
	const sendBtn = getElement<HTMLButtonElement>(container, '#send-btn')
	const sendIcon = getElement<SVGElement>(container, '#send-icon')
	const stopIcon = getElement<SVGElement>(container, '#stop-icon')
	const charCount = getElement<HTMLElement>(container, '#char-count')
	const ctxBar = getElement<HTMLElement>(container, '#ctx-bar')
	const ctxAddBtn = getElement<HTMLButtonElement>(container, '#ctx-add-btn')
	const newChatBtn = getElement<HTMLButtonElement>(container, '#new-chat-btn')
	const attachBtn = getElement<HTMLButtonElement>(container, '#attach-btn')
	const clearBtn = getElement<HTMLButtonElement>(container, '#clear-btn')
	const lifetimeTokensEl = getElement<HTMLElement>(
		container,
		'#setting-lifetime-tokens'
	)
	const scrollableElements = container.querySelectorAll<HTMLElement>(
		'#ai-panel, #msgs-wrap'
	)

	scrollableElements.forEach(el => {
		el.onwheel = event => event.stopPropagation()
		el.ontouchmove = event => event.stopPropagation()
	})
	let messages: ChatMessage[] = []
	let ctxFiles: ContextFile[] = []
	let isStreaming = false
	let ctxMenuOpen = false
	let controller: AbortController | null = null

	let userIsScrolling = false

	msgsWrap.addEventListener('touchstart', () => {
		userIsScrolling = true
	})
	msgsWrap.addEventListener('touchend', () => {
		userIsScrolling = false
	})
	container.addEventListener('focus', scrollBottom)
	msgsWrap.addEventListener('focus', scrollBottom)

	const aiPanelEl = getElement<HTMLElement>(container, '#ai-panel')
	const ctxMenuEl = createEl('div')
	ctxMenuEl.className = 'ctx-menu'
	aiPanelEl.appendChild(ctxMenuEl)

	container.querySelectorAll<HTMLElement>('.sug-chip').forEach(chip => {
		chip.onclick = () => {
			inputEl.value = chip.dataset.prompt || ''
			inputEl.focus()
			syncInputState()
		}
	})

	function resize(): void {
		if (inputEl.scrollHeight < 40 || inputEl.value === '') {
			inputEl.style.minHeight = '40px'
			return
		}
		inputEl.style.minHeight = `${Math.min(inputEl.scrollHeight, 130)}px`
	}

	function updateCount(): void {
		const length = inputEl.value.length
		charCount.textContent = String(length || '0')
		charCount.classList.toggle('warn', length > 2000)
	}

	let debounceTimer: number | undefined

	const syncInputState = (): void => {
		resize()
		updateCount()

		if (inputEl.value.trim() === '') {
			window.localStorage?.removeItem('draft-message')
			return
		}

		if (debounceTimer != null) window.clearTimeout(debounceTimer)

		debounceTimer = window.setTimeout(() => {
			window.localStorage?.setItem('draft-message', inputEl.value)
			debounceTimer = undefined
		}, 500)
	}

	inputEl.addEventListener('input', syncInputState)

	sendBtn.onclick = () => (isStreaming ? stopStream() : handleSend())

	newChatBtn.onclick = () => {
		messages = []
		newChatHistory()
		renderAll()
	}
	clearBtn.onclick = async () => {
		const confirm = acode.require('confirm')
		const res = await confirm(
			'Are you sure?',
			'This will delete this message history forever! And all the edited file history records will be cleared.'
		)

		if (res) {
			messages = []
			renderAll()
			void deleteChatHistory()
		}
	}
	ctxAddBtn.onclick = event =>
		openContextMenu(event.currentTarget as HTMLElement)
	attachBtn.onclick = event =>
		openContextMenu(event.currentTarget as HTMLElement)

	function renderCtxBar(): void {
		ctxBar.querySelectorAll('.ctx-chip').forEach(chip => chip.remove())

		ctxFiles.forEach((file, index) => {
			const chip = createEl('div')
			chip.className = 'ctx-chip'
			chip.innerHTML = `
     <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
     <span class="ctx-chip-name">${escapeHtml(file.previewName)}</span>
     <button class="ctx-remove" title="Remove">
       <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
     </button>`

			const removeButton =
				chip.querySelector<HTMLButtonElement>('.ctx-remove')
			if (removeButton) {
				removeButton.addEventListener('click', () => {
					ctxFiles.splice(index, 1)
					renderCtxBar()
				})
			}

			ctxBar.insertBefore(chip, ctxAddBtn)
		})
	}

	function addContextFile(file: ContextFile): void {
		// const exists = ctxFiles.some(
		//    (ctxFile) => ctxFile.id === file.id || ctxFile.uri === file.uri,
		// );
		// if (exists) return;

		ctxFiles.push(file)
		renderCtxBar()
	}

	function closeContextMenu(): void {
		ctxMenuEl.classList.remove('open')
		ctxMenuEl.innerHTML = ''
		ctxMenuOpen = false
	}

	function openContextMenu(triggerEl: HTMLElement): void {
		ctxMenuEl.innerHTML = ''
		const attachedKeys = new Set(
			ctxFiles.map(file => `${file.id}::${file.uri}`)
		)

		const filteredActiveFiles = getActiveFiles().filter(
			file => !attachedKeys.has(`${file.id}::${file.uri}`)
		)

		if (!filteredActiveFiles.length) {
			const empty = createEl('div')
			empty.className = 'ctx-menu-empty'
			empty.textContent = 'No active file. Open a file to attach.'
			ctxMenuEl.appendChild(empty)
		} else {
			filteredActiveFiles.forEach(file => {
				const option = createEl('button')
				option.className = 'ctx-menu-option'
				option.type = 'button'
				option.textContent = file.previewUri
				option.value = file.uri
				option.addEventListener('click', () => {
					addContextFile(file)
					closeContextMenu()
				})
				ctxMenuEl.appendChild(option)
			})
		}

		const panelRect = aiPanelEl.getBoundingClientRect()
		const triggerRect = triggerEl.getBoundingClientRect()
		const fromTop = triggerRect.top < panelRect.top + panelRect.height / 2
		const left = Math.min(
			Math.max(triggerRect.left - panelRect.left, 4),
			Math.max(panelRect.width - 184, 4)
		)

		ctxMenuEl.style.left = `${left}px`
		ctxMenuEl.style.right = 'auto'
		ctxMenuEl.style.top = fromTop
			? `${triggerRect.bottom - panelRect.top + 4}px`
			: 'auto'
		ctxMenuEl.style.bottom = fromTop
			? 'auto'
			: `${panelRect.bottom - triggerRect.top + 4}px`

		ctxMenuEl.classList.add('open')
		ctxMenuOpen = true
	}

	async function renderAll(): Promise<void> {
		msgsInner
			.querySelectorAll('.msg-row, .thinking-row')
			.forEach(node => node.remove())

		emptyState.style.display = messages.length === 0 ? 'flex' : 'none'

		for (let i = 0; i < messages.length; i++) {
			const row = await buildRow(messages[i], i)
			msgsInner.appendChild(row)
		}
		scrollBottom()
	}

	async function render(): Promise<void> {
		if (emptyState.style.display !== 'none') emptyState.style.display = 'none'

		const msgIndex = messages.length - 1
		msgsInner.appendChild(await buildRow(messages[msgIndex], msgIndex))
		scrollBottom()
	}

	async function addFinishUp(
		row: HTMLDivElement,
		idx: number,
		text: string
	): Promise<void> {
		const aiContent = row.querySelector<HTMLElement>('.ai-content')
		const copyBtn = row.querySelector<HTMLButtonElement>('.copy-btn')
		const regenBtn = row.querySelector<HTMLButtonElement>('.regen-btn')

		attachCodeButtons(aiContent)

		copyBtn?.addEventListener('click', () =>
			copyText(text, copyBtn, doc.document)
		)

		regenBtn?.addEventListener('click', async () => {
			if (text !== '') messages.splice(idx)
			await renderAll()
			simulateAIResponse()
		})
	}

	async function buildRow(
		msg: ChatMessage,
		idx: number
	): Promise<HTMLDivElement> {
		const row = createEl('div')
		row.className = `msg-row ${msg.role}`
		row.dataset.idx = String(idx)

		if (msg.role === 'user') {
			row.innerHTML = `
				<div class="msg-meta">
					<div class="msg-avatar user-av"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
					<span class="msg-name">you</span>
				</div>
				<div class="user-bubble">
					${
						msg.ctxName?.map(
							ctx =>
								`<div class="user-ctx-chip"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${escapeHtml(
									ctx
								)}</div>`
						) ?? ''
					}
					${escapeHtml(msg.text, true)}
				</div>
				<div class="msg-actions">
					<button class="act-btn copy-btn" title="Copy">
						<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
					</button>
					<button class="act-btn edit-btn" title="Edit &amp; resend">
						<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> edit
					</button>
				</div>
			`

			const copyBtn = row.querySelector<HTMLButtonElement>('.copy-btn')
			const editBtn = row.querySelector<HTMLButtonElement>('.edit-btn')

			copyBtn?.addEventListener('click', () => copyText(msg.text, copyBtn))
			editBtn?.addEventListener('click', async () => {
				inputEl.value = msg.text
				messages.splice(idx)
				await renderAll()
				inputEl.focus()
				syncInputState()
			})
		} else {
			row.innerHTML = `
				<div class="msg-meta">
					<div class="msg-avatar ai-av"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
					<span class="msg-name">Rutex AI Agent</span>
				</div>
				<div class="ai-content">
					${await renderMarkdown(msg.text)}
				</div>
				<div class="msg-actions">
					<div class="msg-action-group">
						<button class="act-btn copy-btn" title="Copy">
							<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
						</button>
						<button class="act-btn regen-btn" title="Retry">
							<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.7-6.7L23 10"/></svg> retry
						</button>
					</div>
					<span class="msg-model-tag">${escapeHtml(msg.modelUsed || '')}</span>
				</div>`

			addFinishUp(row, idx, msg.text)
		}

		return row
	}

	function stopStream(abort: boolean = true): void {
		if (abort) controller?.abort()

		controller = null
		isStreaming = false
		sendIcon.style.display = ''
		stopIcon.style.display = 'none'
		sendBtn.classList.remove('stop')
		sendBtn.disabled = false
		msgsInner
			.querySelectorAll('.thinking-row, .stream-cursor')
			.forEach(node => node.remove())
	}

	// ─────────────────────────────────────────────
	// REAL AI RESPONSE STREAMING
	// ─────────────────────────────────────────────
	async function simulateAIResponse(): Promise<void> {
		const thinking = createEl('div')
		thinking.className = 'thinking-row'
		thinking.innerHTML =
			'<div class="thinking-dots"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div><span class="thinking-label">thinking…</span>'
		msgsInner.appendChild(thinking)
		scrollBottom()

		controller = new AbortController()
		isStreaming = true
		sendIcon.style.display = 'none'
		stopIcon.style.display = ''
		sendBtn.classList.add('stop')
		sendBtn.disabled = false

		let aiIdx: number | null = null
		let liveRow: HTMLDivElement = createEl('div')
		let liveContent: HTMLDivElement | null = null
		let saveDebounceTimer: NodeJS.Timeout | undefined

		let completeMessage: string = ''
		let lastHistoryWorkspace: string | undefined
		let lastActiveFile: string | undefined

		// --- Prepare messages with user context for AI ---
		// --- Filter away user messages that the next message isn't from AI, to avoid sending irrelevant messages in the history ---
		const filteredChatMessages = messages
			.slice(-20)
			.filter((m: ChatMessage, index: number, arr: ChatMessage[]) => {
				if (m.role === 'assistant') return true
				if (m.role === 'user') {
					const isLastMessage = index === arr.length - 1
					const hasAssistantReply = arr[index + 1]?.role === 'assistant'
					return isLastMessage || hasAssistantReply
				}
				return false
			})

		const messagesForAI = filteredChatMessages.map(
			(m: ChatMessage, index: number): AgentChatMessage => {
				const isLastMessage = index === filteredChatMessages.length - 1
				let ctx = ''

				/*if (isLastMessage) {
					ctx += `──────── SUB-SYSTEM INSTRUCTION ────────\n
Never use <system_injected_preview> because it's inserted by the system alone for you (and the user) to be able to have references to your old tool calls, if the <system_injected_preview> json info is for old edited files, then you can use the 'editedFileHistoryId' field value and add it as parameter to your 'view_edited_files_history' tool call to view the full code you added and removed for that file.
After editing any files you should re-read them to make sure there's no error in your edit.\n
`
				}*/

				ctx += `──────── USER CONTEXT ────────\n`
				let hasContext = false

				if (m.ctx) {
					ctx += `FILES ATTACHED: ${m.ctx}\n`
					hasContext = true
				}

				if (m.workspaceUsed !== lastHistoryWorkspace && m.workspaceUsed) {
					ctx += `ACTIVE WORKSPACE: ${m.workspaceUsed}\n`
					lastHistoryWorkspace = m.workspaceUsed
					hasContext = true
				}

				if (m.activeFile !== lastActiveFile && m.activeFile) {
					ctx += `ACTIVE FILE: ${m.activeFile}\n`
					lastActiveFile = m.activeFile
					hasContext = true
				}

				if (!hasContext) ctx = ''
				else ctx += '\n\n──────── USER PROMPT ────────\n'

				// clg('Role:', m.role, 'Context:', ctx, 'Text:', m.text)

				return {
					role: m.role,
					content: ctx + m.text
				}
			}
		)

		const initializeLiveResponse = (): HTMLDivElement | null => {
			thinking.remove()
			liveRow.className = 'msg-row assistant'
			liveRow.innerHTML = `
				<div class="msg-meta">
					<div class="msg-avatar ai-av"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
					<span class="msg-name">Rutex AI Agent</span>
				</div>
				<div class="ai-content" id="live-ai-content"></div>
			`
			msgsInner.appendChild(liveRow)
			return liveRow.querySelector<HTMLDivElement>('#live-ai-content')
		}

		try {
			for await (const chunk of sendChat(messagesForAI, controller.signal)) {
				if (chunk.type === 'text' || chunk.type === 'tool') {
					// --- INITIAL AI RESPONSE HTML ---
					if (!liveContent || aiIdx === null) {
						liveContent = initializeLiveResponse()
						messages.push({
							role: 'assistant',
							text: '',
							modelUsed: chunk.model
						})
						aiIdx = messages.length - 1
					}

					// --- STREAMING RESPONSE UPDATE ---
					if (liveContent && aiIdx !== null) {
						const message = messages[aiIdx]

						message.text += chunk.delta
						completeMessage += chunk.delta

						if (chunk.type === 'tool') {
							const dd = await processSingleToolCallTag(chunk.delta)

							if (dd.editedFileHistoryId) {
								message.editedFileHistoryIds ??= []
								message.editedFileHistoryIds.push(
									dd.editedFileHistoryId
								)
							}

							liveContent.querySelector('.stream-cursor')?.remove()
							liveContent.innerHTML +=
								dd.html + '<span class="stream-cursor"></span>'
						} else
							liveContent.innerHTML =
								(await renderMarkdown(message.text)) +
								'<span class="stream-cursor"></span>'

						attachCodeButtons(liveContent)
						scrollBottom()

						if (!saveDebounceTimer) {
							saveDebounceTimer = setTimeout(() => {
								void saveChatHistory(messages)
								saveDebounceTimer = undefined
							}, 700)
						}
					}
				} else if (chunk.type === 'done') {
					stopStream(false)

					if (liveContent && aiIdx !== null) {
						if (chunk.provider === 'qwen') {
							const cleanedMessage = stripTrailingDetailsBlock(
								completeMessage || messages[aiIdx].text
							)
							messages[aiIdx].text = cleanedMessage
							completeMessage = cleanedMessage
							liveContent.innerHTML =
								await renderMarkdown(cleanedMessage)
						}

						if (saveDebounceTimer) {
							clearTimeout(saveDebounceTimer)
							saveDebounceTimer = undefined
						}

						addLifetimeTokens(chunk.usage.totalTokens)
						lifetimeTokensEl.textContent = formatTokenNumber(
							aiSettings.lifetimeTokensUsed
						)

						messages[aiIdx].modelUsed = chunk.model
						void saveChatHistory(messages)
					}
				}
			}
		} catch (e: any) {
			if (e instanceof Error && e.name === 'AbortError') {
				return
			}

			stopStream(false)

			completeMessage = completeMessage.trim()

			if (!liveContent) liveContent = initializeLiveResponse()
			if (liveContent)
				liveContent.innerHTML += `<div class="error">${escapeHtml(
					e.message || String(e || 'There was an unknown error')
				)}</div>`
		} finally {
			if (liveContent) {
				const actionBtns = createEl('div')
				actionBtns.className = 'msg-actions'
				actionBtns.innerHTML = `
               <div class="msg-action-group">
						<button class="act-btn copy-btn" title="Copy">
							<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
						</button>
						<button class="act-btn regen-btn" title="Retry">
							<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.7-6.7L23 10"/></svg> retry
						</button>
               </div>
               <span class="msg-model-tag">${escapeHtml(
						messages[aiIdx ?? -1]?.modelUsed || ''
					)}</span>
				`

				liveRow.appendChild(actionBtns)

				addFinishUp(liveRow, aiIdx ?? -1, completeMessage)
				scrollBottom()
			}
		}
	}

	async function handleSend(): Promise<void> {
		const text = inputEl.value
		if (!text.trim()) return

		const ctxName: string[] = []

		const ctx = ctxFiles.length
			? ctxFiles
					.map(file => {
						ctxName.push(file.previewUri)
						return file.uri
					})
					.join(' | ')
			: null

		ctxFiles = []
		inputEl.value = ''
		resize()
		updateCount()
		renderCtxBar()

		messages.push({
			role: 'user',
			text,
			ctx,
			ctxName: ctxName.length ? ctxName : null,
			workspaceUsed: getWorkspaceFolders().join(' | '),
			activeFile: editorManager.activeFile?.uri
		})
		await render()

		void saveChatHistory(messages)
		window.localStorage?.removeItem('draft-message')

		simulateAIResponse()
	}

	function attachCodeButtons(root: ParentNode | null): void {
		if (!root) return

		root
			.querySelectorAll<HTMLButtonElement>('.copy-code-btn:not([data-b])')
			.forEach(button => {
				button.dataset.b = '1'
				button.addEventListener('click', () => {
					copyText(decodeBase64Safe(button.dataset.enc || ''), button)
				})
			})
	}

	function scrollBottom(): void {
		if (userIsScrolling) return
		msgsWrap.scrollTop = msgsWrap.scrollHeight
	}

	doc.document.addEventListener(
		'click',
		event => {
			if (!ctxMenuOpen) return

			const target = event.target
			if (!(target instanceof Node)) return
			if (
				ctxMenuEl.contains(target) ||
				ctxAddBtn.contains(target) ||
				attachBtn.contains(target)
			) {
				return
			}
			closeContextMenu()
		},
		true
	)

	const draftMessage = window.localStorage?.getItem('draft-message')
	if (draftMessage) inputEl.value = draftMessage

	void retrieveChatHistory().then(async history => {
		messages = history
		await renderAll()
		scrollBottom()
	})
	historyContainer(container, doc.document, async history => {
		messages = history
		await renderAll()
		scrollBottom()
		inputEl.focus()
	})

	settingsContainer(container)
	resize()
	updateCount()
	renderCtxBar()
	inputEl.focus()

	return scrollBottom
}

export { renderPanel }
