import panel from './panel.html'
import { RANDOM_RESPONSES } from './configs/constants'
import { renderMarkdown, renderEditedFileLines, EditedFileLines } from './panel/markdown'
import type {
	AIPanelAPI,
	ChatMessage,
	ContextFile,
	EditorManagerLike,
	FileLike
} from './panel/types'
import {
	decodeBase64Safe,
	escapeHtml,
	getElement,
	getFileNameFromPath
} from './panel/utils'

declare global {
	interface Window {
		aiPanel?: AIPanelAPI
	}
}

const renderPanel = (container: HTMLElement): void => {
	container.style.padding = '0'
	container.innerHTML = panel

	const doc = container.ownerDocument || document
	const createEl = <T extends keyof HTMLElementTagNameMap>(
		tag: T
	): HTMLElementTagNameMap[T] => doc.createElement(tag)
	const esc = (value: string): string => escapeHtml(doc, value)

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
	const modelSel = getElement<HTMLSelectElement>(container, '#model-select')
	const ctxBar = getElement<HTMLElement>(container, '#ctx-bar')
	const ctxAddBtn = getElement<HTMLButtonElement>(container, '#ctx-add-btn')
	const newChatBtn = getElement<HTMLButtonElement>(container, '#new-chat-btn')
	const attachBtn = getElement<HTMLButtonElement>(container, '#attach-btn')
	const selBtn = getElement<HTMLButtonElement>(container, '#sel-btn')
	const clearBtn = getElement<HTMLButtonElement>(container, '#clear-btn')

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
	let streamTimeout: number | null = null
	let ctxMenuOpen = false

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

	const draftMessage = localStorage.getItem('draft-message')
	if (draftMessage) inputEl.value = draftMessage

	resize()
	updateCount()

	let debounceTimer: number | undefined

	const syncInputState = (): void => {
		resize()
		updateCount()

		if (inputEl.value.trim() === '') {
			localStorage.removeItem('draft-message')
			return
		}

		if (debounceTimer != null) window.clearTimeout(debounceTimer)

		debounceTimer = window.setTimeout(() => {
			localStorage.setItem('draft-message', inputEl.value)
			debounceTimer = undefined
		}, 500)
	}

	let skipNextBeforeInputEnter = false
	const triggerSendAction = (): void => {
		if (isStreaming) {
			stopStream()
		} else {
			handleSend()
		}
	}

	const maybeSendFromEnter = (event: KeyboardEvent): void => {
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault()
			skipNextBeforeInputEnter = true
			setTimeout(() => {
				skipNextBeforeInputEnter = false
			}, 0)
			triggerSendAction()
		}
	}

	inputEl.addEventListener('input', syncInputState)
	inputEl.addEventListener('keydown', maybeSendFromEnter)
	inputEl.addEventListener('beforeinput', event => {
		const beforeInputEvent = event as InputEvent & {
			getModifierState?: (keyArg: string) => boolean
		}
		const isShiftPressed = beforeInputEvent.getModifierState
			? beforeInputEvent.getModifierState('Shift')
			: false
		if (
			event.inputType === 'insertLineBreak' &&
			isShiftPressed &&
			!event.isComposing
		) {
			event.preventDefault()
			if (skipNextBeforeInputEnter) {
				skipNextBeforeInputEnter = false
				return
			}
			triggerSendAction()
		}
	})

	sendBtn.onclick = () => (isStreaming ? stopStream() : handleSend())

	newChatBtn.onclick = () => {
		messages = []
		renderAll()
	}
	clearBtn.onclick = () => {
		messages = []
		renderAll()
	}

	ctxAddBtn.onclick = event =>
		openContextMenu(event.currentTarget as HTMLElement)
	attachBtn.onclick = event =>
		openContextMenu(event.currentTarget as HTMLElement)

	selBtn.onclick = () => {
		container.dispatchEvent(
			new CustomEvent('ai-panel-get-selection', {
				detail: {
					onSelection: (text: string) => {
						if (!text) return
						inputEl.value += `\n\`\`\`\n${text}\n\`\`\`\n`
						resize()
						updateCount()
						inputEl.focus()
					}
				}
			})
		)
	}

	function renderCtxBar(): void {
		ctxBar.querySelectorAll('.ctx-chip').forEach(chip => chip.remove())
		ctxFiles.forEach((file, index) => {
			const chip = createEl('div')
			chip.className = 'ctx-chip'
			chip.innerHTML = `
     <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
     <span class="ctx-chip-name">${esc(file.name)}</span>
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

	function getActiveFiles(): ContextFile[] {
		const editorManager = acode?.require?.('editorManager') as
			| EditorManagerLike
			| undefined
		const candidates: ContextFile[] = []
		const seen = new Set<string>()

		const pushCandidate = (file?: FileLike): void => {
			if (!file) return
			const path =
				file.path ||
				file.uri ||
				file.url ||
				file.location ||
				file.fullPath ||
				file.file?.path ||
				file.file?.uri ||
				file.file?.url ||
				''

			const name = file.name || file.filename || getFileNameFromPath(path)
			if (!name) return
			const key = path || name
			if (seen.has(key)) return
			seen.add(key)

			const content =
				file.content ||
				file.session?.getValue?.() ||
				file.editor?.getValue?.() ||
				''

			candidates.push({ name, path: path || name, content })
		}

		const fileCollections = [
			editorManager?.files,
			editorManager?.openFiles,
			editorManager?.editorFiles
		]

		fileCollections.forEach(collection => {
			if (!Array.isArray(collection)) return
			collection.forEach(file => pushCandidate(file))
		})

		pushCandidate(editorManager?.activeFile)
		pushCandidate(editorManager?.activeFile?.file)
		return candidates
	}

	function addContextFile(file: ContextFile): void {
		if (!file.name) return
		const exists = ctxFiles.some(
			ctx => (ctx.path || ctx.name) === (file.path || file.name)
		)
		if (exists) return

		ctxFiles.push({
			name: file.name,
			content: file.content || '',
			path: file.path || file.name
		})
		renderCtxBar()
	}

	function insertContextToken(file: ContextFile): void {
		if (!file.name) return
		const safePath = esc(file.path || file.name)
		const safeName = esc(file.name)
		const token = `<a data-path="${safePath}">${safeName}</a>`
		const spacer = inputEl.value && !/\s$/.test(inputEl.value) ? ' ' : ''
		inputEl.value += `${spacer}${token} `
		inputEl.focus()
		syncInputState()
	}

	function closeContextMenu(): void {
		ctxMenuEl.classList.remove('open')
		ctxMenuEl.innerHTML = ''
		ctxMenuOpen = false
	}

	function openContextMenu(triggerEl: HTMLElement): void {
		const files = getActiveFiles()
		ctxMenuEl.innerHTML = ''

		if (!files.length) {
			const empty = createEl('div')
			empty.className = 'ctx-menu-empty'
			empty.textContent = 'No active file. Open a file to attach.'
			ctxMenuEl.appendChild(empty)
		} else {
			files.forEach(file => {
				const option = createEl('button')
				option.className = 'ctx-menu-option'
				option.type = 'button'
				option.textContent = file.name
				option.value = file.path || file.name
				option.title = file.path || file.name
				option.addEventListener('click', () => {
					addContextFile(file)
					insertContextToken(file)
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

	function renderAll(): void {
		msgsInner
			.querySelectorAll('.msg-row, .thinking-row')
			.forEach(node => node.remove())
		emptyState.style.display = messages.length === 0 ? 'flex' : 'none'
		messages.forEach((message, index) =>
			msgsInner.appendChild(buildRow(message, index))
		)
		scrollBottom()
	}

	function buildRow(msg: ChatMessage, idx: number): HTMLDivElement {
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
			msg.ctxName
				? `<div class="user-ctx-chip"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${esc(
						msg.ctxName
					)}</div>`
				: ''
		}
      ${esc(msg.text).replace(/ /g, '&nbsp;').replace(/\n/g, '<br>')}
     </div>
     <div class="msg-actions">
       <button class="act-btn copy-btn" title="Copy">
         <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
       </button>
       <button class="act-btn edit-btn" title="Edit &amp; resend">
         <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> edit
       </button>
     </div>`

			const copyBtn = row.querySelector<HTMLButtonElement>('.copy-btn')
			const editBtn = row.querySelector<HTMLButtonElement>('.edit-btn')

			copyBtn?.addEventListener('click', () => copyText(msg.text, copyBtn))
			editBtn?.addEventListener('click', () => {
				inputEl.value = msg.text
				messages.splice(idx)
				renderAll()
				inputEl.focus()
			})
		} else {
			const editedFiles: EditedFileLines = [
				{ line: 1, text: '<html>', isAdded: false },
				{ line: 1, text: '<?php', isAdded: true },
				{ line: 2, text: 'echo "Hello";', isAdded: true },
				{ line: 3, text: '<div class="msg-actions">', isAdded: false },
				{ line: 4, text: '<span class="msg-name">Rutex AI Agent</span>', isAdded: false },
			]

			row.innerHTML = `
				<div class="msg-meta">
					<div class="msg-avatar ai-av"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
					<span class="msg-name">Rutex AI Agent</span>
				</div>
				<div class="ai-content">
					${renderMarkdown(msg.text, esc)}
					${renderEditedFileLines(editedFiles, esc, 'index.php')}
				</div>
				<div class="msg-actions">
					<button class="act-btn copy-btn" title="Copy">
						<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
					</button>
					<button class="act-btn regen-btn" title="Retry">
						<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.7-6.7L23 10"/></svg> retry
					</button>
					<button class="act-btn thumbup-btn" title="Good">
						<svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
					</button>
					<button class="act-btn thumbdn-btn" title="Bad">
						<svg viewBox="0 0 24 24"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
					</button>
				</div>`

			const aiContent = row.querySelector<HTMLElement>('.ai-content')
			const copyBtn = row.querySelector<HTMLButtonElement>('.copy-btn')
			const regenBtn = row.querySelector<HTMLButtonElement>('.regen-btn')
			const thumbUpBtn = row.querySelector<HTMLButtonElement>('.thumbup-btn')
			const thumbDownBtn =
				row.querySelector<HTMLButtonElement>('.thumbdn-btn')

			attachCodeButtons(aiContent)
			copyBtn?.addEventListener('click', () => copyText(msg.text, copyBtn))
			regenBtn?.addEventListener('click', () => {
				if (idx > 0) {
					const prev = messages[idx - 1]
					messages.splice(idx - 1, 2)
					renderAll()
					simulateAIResponse(prev.text, prev.ctxName || null)
				}
			})
			thumbUpBtn?.addEventListener('click', event => {
				;(event.currentTarget as HTMLButtonElement).classList.toggle(
					'active'
				)
			})
			thumbDownBtn?.addEventListener('click', event => {
				;(event.currentTarget as HTMLButtonElement).classList.toggle(
					'active'
				)
			})
		}

		return row
	}

	function stopStream(): void {
		if (streamTimeout != null) {
			window.clearTimeout(streamTimeout)
			streamTimeout = null
		}
		endStream()
	}

	function endStream(): void {
		localStorage.removeItem('draft-message')

		isStreaming = false
		sendIcon.style.display = ''
		stopIcon.style.display = 'none'
		sendBtn.classList.remove('stop')
		sendBtn.disabled = false
		msgsInner
			.querySelectorAll('.thinking-row, .stream-cursor')
			.forEach(node => node.remove())
		renderAll()
	}

	function simulateAIResponse(
		_userMessage: string,
		ctxName: string | null
	): void {
		emptyState.style.display = 'none'
		renderAll()

		const thinking = createEl('div')
		thinking.className = 'thinking-row'
		thinking.innerHTML =
			'<div class="thinking-dots"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div><span class="thinking-label">thinking…</span>'
		msgsInner.appendChild(thinking)
		scrollBottom()

		isStreaming = true
		sendIcon.style.display = 'none'
		stopIcon.style.display = ''
		sendBtn.classList.add('stop')
		sendBtn.disabled = false

		const randomIndex = Math.floor(Math.random() * RANDOM_RESPONSES.length)
		let fullResponse = RANDOM_RESPONSES[randomIndex]

		if (ctxName && ctxFiles.length > 0) {
			fullResponse = `**Context loaded:** ${ctxName}\n\n${fullResponse}`
		}

		let aiText = ''
		let aiIdx: number | null = null
		let liveRow: HTMLDivElement | null = null
		let liveContent: HTMLElement | null = null
		let chunkIndex = 0

		const chunks: string[] = []
		const words = fullResponse.split(/(\s+)/)
		let currentChunk = ''

		for (let index = 0; index < words.length; index++) {
			currentChunk += words[index]
			if (currentChunk.length >= 5 || index === words.length - 1) {
				chunks.push(currentChunk)
				currentChunk = ''
			}
		}

		const sendChunk = (): void => {
			if (chunkIndex < chunks.length) {
				if (aiIdx === null) {
					thinking.remove()
					messages.push({ role: 'ai', text: '' })
					aiIdx = messages.length - 1
					liveRow = createEl('div')
					liveRow.className = 'msg-row ai'
					liveRow.innerHTML = `
           <div class="msg-meta">
             <div class="msg-avatar ai-av"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
             <span class="msg-name">Rutex AI Agent</span>
           </div>
           <div class="ai-content" id="live-ai-content"></div>`
					msgsInner.appendChild(liveRow)
					liveContent =
						liveRow.querySelector<HTMLElement>('#live-ai-content')
				}

				aiText += chunks[chunkIndex]
				if (aiIdx != null) {
					messages[aiIdx].text = aiText
				}

				if (liveContent) {
					liveContent.innerHTML =
						renderMarkdown(aiText, esc) +
						'<span class="stream-cursor"></span>'
					attachCodeButtons(liveContent)
				}
				scrollBottom()
				chunkIndex += 1
				streamTimeout = window.setTimeout(
					sendChunk,
					30 + Math.random() * 50
				)
			} else {
				endStream()
			}
		}

		streamTimeout = window.setTimeout(sendChunk, 100)
	}

	function handleSend(): void {
		const userText = inputEl.value
		if (!userText.trim()) return

		const ctxName = ctxFiles.length
			? ctxFiles.map(file => file.name).join(', ')
			: null

		inputEl.value = ''
		resize()
		updateCount()

		messages.push({ role: 'user', text: userText, ctxName })
		renderAll()
		simulateAIResponse(userText, ctxName)
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

		root
			.querySelectorAll<HTMLButtonElement>('.insert-code-btn:not([data-b])')
			.forEach(button => {
				button.dataset.b = '1'
				button.addEventListener('click', () => {
					const code = decodeBase64Safe(button.dataset.enc || '')
					container.dispatchEvent(
						new CustomEvent('ai-panel-insert', {
							detail: { code }
						})
					)
					const originalHTML = button.innerHTML
					button.innerHTML =
						'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>inserted!'
					button.classList.add('inserted')
					setTimeout(() => {
						button.innerHTML = originalHTML
						button.classList.remove('inserted')
					}, 1800)
				})
			})
	}

	function copyText(text: string, button?: HTMLButtonElement | null): void {
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
			const textarea = Object.assign(createEl('textarea'), { value: text })
			textarea.style.cssText = 'position:fixed;opacity:0'
			doc.body.appendChild(textarea)
			textarea.select()
			doc.execCommand('copy')
			textarea.remove()
			done()
		}

		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(done).catch(fallbackCopy)
		} else {
			fallbackCopy()
		}
	}

	function scrollBottom(): void {
		msgsWrap.scrollTop = msgsWrap.scrollHeight
	}

	doc.addEventListener(
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

	window.aiPanel = {
		addContext: (name: string, content: string): void => {
			ctxFiles.push({ name, content })
			renderCtxBar()
		},
		clearContext: (): void => {
			ctxFiles = []
			renderCtxBar()
		},
		setModel: (model: string): void => {
			modelSel.value = model
		},
		clear: (): void => {
			messages = []
			renderAll()
		}
	}

	renderCtxBar()
	renderAll()
	inputEl.focus()
}

export { renderPanel }
