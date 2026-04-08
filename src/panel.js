import panel from './panel.html'

const renderPanel = container => {
	container.style.padding = '0'
	container.innerHTML = panel
	const doc = container.ownerDocument || document
	const createEl = tag => doc.createElement(tag)

	/* ── Refs ─────────────────────────────────────── */
	const msgsInner = container.querySelector('#msgs-inner')
	const msgsWrap = container.querySelector('#msgs-wrap')
	const emptyState = container.querySelector('#empty-state')
	const inputEl = container.querySelector('#chat-input')
	const sendBtn = container.querySelector('#send-btn')
	const sendIcon = container.querySelector('#send-icon')
	const stopIcon = container.querySelector('#stop-icon')
	const charCount = container.querySelector('#char-count')
	const modelSel = container.querySelector('#model-select')
	const ctxBar = container.querySelector('#ctx-bar')
	const ctxAddBtn = container.querySelector('#ctx-add-btn')
	const newChatBtn = container.querySelector('#new-chat-btn')
	const attachBtn = container.querySelector('#attach-btn')
	const selBtn = container.querySelector('#sel-btn')
	const clearBtn = container.querySelector('#clear-btn')

	/* ── State ────────────────────────────────────── */
	let messages = [] // { role:'user'|'ai', text, ctxName? }
	let ctxFiles = [] // { name, content }
	let isStreaming = false
	let streamTimeout = null

	/* ── Random AI Responses ───────────────────────── */
	const randomResponses = [
		"I understand you're working on that. Here's what I think would help:\n\n```javascript\n// Example solution\nfunction solveProblem(input) {\n  return input.map(item => item * 2);\n}\n```\n\nThis should handle your use case efficiently.",

		'Great question! Based on your context, I\'d suggest looking at it this way:\n\n```python\ndef process_data(data):\n    """Process the incoming data structure"""\n    result = {}\n    for key, value in data.items():\n        result[key.upper()] = value\n    return result\n```\n\nLet me know if you need clarification on any part.',

		'I see what you\'re trying to accomplish. Here\'s a practical approach:\n\n```bash\n# Here\'s a command that might help\ngrep -r "pattern" --include="*.js" .\n```\n\nThis will search through all your JavaScript files for the pattern you need.',

		'Let me break this down for you. The key insight is to think about data flow:\n\n```typescript\ninterface DataStructure {\n  id: string;\n  value: number;\n  metadata: Record<string, unknown>;\n}\n\nfunction transform(item: DataStructure): DataStructure {\n  return {\n    ...item,\n    value: item.value * 2\n  };\n}\n```\n\nDoes this align with what you had in mind?',

		"Interesting challenge! Here's how I would approach it:\n\n```javascript\n// Event-driven solution\nclass EventHandler {\n  constructor() {\n    this.events = {};\n  }\n  \n  on(event, callback) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(callback);\n  }\n  \n  emit(event, data) {\n    (this.events[event] || []).forEach(cb => cb(data));\n  }\n}\n```\n\nThis pattern should give you the flexibility you need.",

		"Based on what you're asking, consider this refactoring:\n\n```python\ndef optimized_function(items):\n    # Using list comprehension for better performance\n    return [item for item in items if item.is_valid()]\n```\n\nThis is more Pythonic and efficient than using traditional loops.",

		"I think you'll find this pattern useful:\n\n```javascript\n// Memoization for expensive operations\nconst memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};\n```\n\nThis will cache results and improve performance significantly.",

		"Here's a different perspective on your problem:\n\n```sql\n-- Query to get the data you need\nSELECT \n  u.name,\n  COUNT(o.id) as order_count,\n  SUM(o.total) as total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id\nHAVING total_spent > 1000;\n```\n\nThis should give you the aggregated insights you're looking for.",

		"Let me show you a clean way to implement that:\n\n```javascript\n// Async error handling wrapper\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\n// Usage\napp.get('/data', asyncHandler(async (req, res) => {\n  const data = await fetchData();\n  res.json(data);\n}));\n```\n\nThis eliminates try-catch boilerplate throughout your codebase.",

		"I appreciate your question. Here's the solution I'd recommend:\n\n```rust\nfn process_vector(vec: Vec<i32>) -> Vec<i32> {\n    vec.into_iter()\n        .filter(|&x| x > 0)\n        .map(|x| x * 2)\n        .collect()\n}\n```\n\nRust's iterator system makes this very efficient and safe."
	]

	/* ── Suggestions ──────────────────────────────── */
	container.querySelectorAll('.sug-chip').forEach(chip => {
		chip.onclick = () => {
			inputEl.value = chip.dataset.prompt
			inputEl.focus()
			resize()
			updateCount()
		}
	})

	/* ── Textarea ─────────────────────────────────── */
	function resize() {
		inputEl.style.height = 'auto'
		inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px'
	}
	function updateCount() {
		const n = inputEl.value.length
		charCount.textContent = n || '0'
		charCount.classList.toggle('warn', n > 2000)
	}
	const syncInputState = () => {
		resize()
		updateCount()
	}
	let skipNextBeforeInputEnter = false
	const triggerSendAction = () => (isStreaming ? stopStream() : handleSend())
	const maybeSendFromEnter = e => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			// keydown often fires before beforeinput; skip the paired beforeinput.
			skipNextBeforeInputEnter = true
			setTimeout(() => {
				skipNextBeforeInputEnter = false
			}, 0)
			triggerSendAction()
		}
	}
	inputEl.addEventListener('input', syncInputState)
	inputEl.addEventListener('keydown', maybeSendFromEnter)
	inputEl.addEventListener('beforeinput', e => {
		const isShiftPressed = e.getModifierState
			? e.getModifierState('Shift')
			: false
		if (
			e.inputType === 'insertLineBreak' &&
			!isShiftPressed &&
			!e.isComposing
		) {
			e.preventDefault()
			if (skipNextBeforeInputEnter) {
				skipNextBeforeInputEnter = false
				return
			}
			triggerSendAction()
		}
	})

	/* ── Buttons ──────────────────────────────────── */
	sendBtn.onclick = () => (isStreaming ? stopStream() : handleSend())

	newChatBtn.onclick = () => {
		messages = []
		renderAll()
	}
	clearBtn.onclick = () => {
		messages = []
		renderAll()
	}

	ctxAddBtn.onclick = () => {
		container.dispatchEvent(
			new CustomEvent('ai-panel-get-file', {
				detail: {
					onFile: ({ name, content }) => {
						if (!ctxFiles.find(f => f.name === name)) {
							ctxFiles.push({ name, content })
							renderCtxBar()
						}
					}
				}
			})
		)
	}
	attachBtn.onclick = () => ctxAddBtn.click()

	selBtn.onclick = () => {
		container.dispatchEvent(
			new CustomEvent('ai-panel-get-selection', {
				detail: {
					onSelection: text => {
						if (!text) return
						inputEl.value += '\n```\n' + text + '\n```\n'
						resize()
						updateCount()
						inputEl.focus()
					}
				}
			})
		)
	}

	/* ── Context Bar ──────────────────────────────── */
	function renderCtxBar() {
		ctxBar.querySelectorAll('.ctx-chip').forEach(c => c.remove())
		ctxFiles.forEach((f, i) => {
			const chip = createEl('div')
			chip.className = 'ctx-chip'
			chip.innerHTML = `
     <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
     <span class="ctx-chip-name">${esc(f.name)}</span>
     <button class="ctx-remove" title="Remove">
       <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
     </button>`
			chip.querySelector('.ctx-remove').addEventListener('click', () => {
				ctxFiles.splice(i, 1)
				renderCtxBar()
			})
			ctxBar.insertBefore(chip, ctxAddBtn)
		})
	}

	/* ── Render all messages ──────────────────────── */
	function renderAll() {
		msgsInner
			.querySelectorAll('.msg-row, .thinking-row')
			.forEach(n => n.remove())
		emptyState.style.display = messages.length === 0 ? 'flex' : 'none'
		messages.forEach((m, i) => msgsInner.appendChild(buildRow(m, i)))
		scrollBottom()
	}

	/* ── Build row ────────────────────────────────── */
	function buildRow(msg, idx) {
		const row = createEl('div')
		row.className = 'msg-row ' + msg.role
		row.dataset.idx = idx

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
       ${esc(msg.text)}
     </div>
     <div class="msg-actions">
       <button class="act-btn copy-btn" title="Copy">
         <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> copy
       </button>
       <button class="act-btn edit-btn" title="Edit &amp; resend">
         <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> edit
       </button>
     </div>`

			row.querySelector('.copy-btn').addEventListener('click', () =>
				copyText(msg.text, row.querySelector('.copy-btn'))
			)
			row.querySelector('.edit-btn').addEventListener('click', () => {
				inputEl.value = msg.text
				messages.splice(idx)
				renderAll()
				resize()
				updateCount()
				inputEl.focus()
			})
		} else {
			row.innerHTML = `
     <div class="msg-meta">
       <div class="msg-avatar ai-av"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
       <span class="msg-name">Rutex AI Agent</span>
     </div>
     <div class="ai-content">${renderMD(msg.text)}</div>
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

			attachCodeBtns(row.querySelector('.ai-content'))
			row.querySelector('.copy-btn').addEventListener('click', () =>
				copyText(msg.text, row.querySelector('.copy-btn'))
			)
			row.querySelector('.regen-btn').addEventListener('click', () => {
				if (idx > 0) {
					const prev = messages[idx - 1]
					messages.splice(idx - 1, 2)
					renderAll()
					simulateAIResponse(prev.text, prev.ctxName)
				}
			})
			row.querySelector('.thumbup-btn').addEventListener('click', e =>
				e.currentTarget.classList.toggle('active')
			)
			row.querySelector('.thumbdn-btn').addEventListener('click', e =>
				e.currentTarget.classList.toggle('active')
			)
		}
		return row
	}

	/* ── Stop stream ──────────────────────────────── */
	function stopStream() {
		if (streamTimeout) {
			clearTimeout(streamTimeout)
			streamTimeout = null
		}
		endStream()
	}
	function endStream() {
		isStreaming = false
		sendIcon.style.display = ''
		stopIcon.style.display = 'none'
		sendBtn.classList.remove('stop')
		sendBtn.disabled = false
		msgsInner
			.querySelectorAll('.thinking-row, .stream-cursor')
			.forEach(n => n.remove())
		renderAll()
	}

	/* ── Simulate AI Response (No API) ────────────── */
	function simulateAIResponse(userMessage, ctxName) {
		emptyState.style.display = 'none'
		renderAll()

		// Thinking indicator
		const thinking = createEl('div')
		thinking.className = 'thinking-row'
		thinking.innerHTML = `<div class="thinking-dots"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div><span class="thinking-label">thinking…</span>`
		msgsInner.appendChild(thinking)
		scrollBottom()

		isStreaming = true
		sendIcon.style.display = 'none'
		stopIcon.style.display = ''
		sendBtn.classList.add('stop')
		sendBtn.disabled = false

		// Pick a random response
		const randomIndex = Math.floor(Math.random() * randomResponses.length)
		let fullResponse = randomResponses[randomIndex]

		// Add context awareness if files are attached
		if (ctxName && ctxFiles.length > 0) {
			fullResponse = `**Context loaded:** ${ctxName}\n\n` + fullResponse
		}

		let aiText = ''
		let aiIdx = null
		let liveRow = null
		let liveContent = null
		let chunkIndex = 0

		// Split response into chunks for streaming effect
		const chunks = []
		const words = fullResponse.split(/(\s+)/)
		let currentChunk = ''

		for (let i = 0; i < words.length; i++) {
			currentChunk += words[i]
			if (currentChunk.length >= 5 || i === words.length - 1) {
				chunks.push(currentChunk)
				currentChunk = ''
			}
		}

		function sendChunk() {
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
					liveContent = liveRow.querySelector('#live-ai-content')
				}

				aiText += chunks[chunkIndex]
				messages[aiIdx].text = aiText
				if (liveContent) {
					liveContent.innerHTML =
						renderMD(aiText) + '<span class="stream-cursor"></span>'
					attachCodeBtns(liveContent)
				}
				scrollBottom()
				chunkIndex++
				streamTimeout = setTimeout(sendChunk, 30 + Math.random() * 50)
			} else {
				endStream()
			}
		}

		streamTimeout = setTimeout(sendChunk, 100)
	}

	/* ── Handle send ──────────────────────────────── */
	function handleSend() {
		const text = inputEl.value.trim()
		if (!text) return

		const ctxName = ctxFiles.length
			? ctxFiles.map(f => f.name).join(', ')
			: null

		inputEl.value = ''
		inputEl.style.height = 'auto'
		updateCount()

		messages.push({ role: 'user', text, ctxName })
		renderAll()

		simulateAIResponse(text, ctxName)
	}

	/* ── Markdown ─────────────────────────────────── */
	function renderMD(raw) {
		let h = esc(raw)

		// Fenced code blocks
		h = h.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
			const l = lang || 'code'
			const enc = btoa(unescape(encodeURIComponent(code.trimEnd())))
			return `<div class="code-block">
     <div class="code-header">
       <span class="code-lang">${esc(l)}</span>
       <div class="code-actions">
         <button class="code-btn copy-code-btn" data-enc="${enc}">
           <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>copy
         </button>
         <button class="code-btn insert-code-btn" data-enc="${enc}">
           <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>insert
         </button>
       </div>
     </div>
     <div class="code-body">${esc(code.trimEnd())}</div>
   </div>`
		})

		// Headings
		h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>')
		h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>')
		h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>')

		// Bold / italic
		h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		h = h.replace(/\*(.+?)\*/g, '<em>$1</em>')

		// Blockquote
		h = h.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')

		// Lists
		h = h.replace(/((?:^[-*] .+(?:\n|$))+)/gm, blk => {
			const items = blk
				.trim()
				.split('\n')
				.map(l => `<li>${l.replace(/^[-*] /, '')}</li>`)
				.join('')
			return `<ul>${items}</ul>`
		})
		h = h.replace(/((?:^\d+\. .+(?:\n|$))+)/gm, blk => {
			const items = blk
				.trim()
				.split('\n')
				.map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`)
				.join('')
			return `<ol>${items}</ol>`
		})

		// Inline code
		h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>')

		// Paragraphs
		h = h.replace(/\n{2,}/g, '</p><p>')
		h = h.replace(/\n/g, '<br>')
		h = '<p>' + h + '</p>'

		// Unwrap p around block elements
		h = h.replace(/<p>(<(?:div|ul|ol|h[1-3]|blockquote))/g, '$1')
		h = h.replace(/((?:div|ul|ol|h[1-3]|blockquote)>)<\/p>/g, '$1')

		return h
	}

	/* ── Code button listeners ────────────────────── */
	function attachCodeBtns(root) {
		if (!root) return
		root.querySelectorAll('.copy-code-btn:not([data-b])').forEach(btn => {
			btn.dataset.b = '1'
			btn.addEventListener('click', () => {
				copyText(decode(btn.dataset.enc), btn)
			})
		})
		root.querySelectorAll('.insert-code-btn:not([data-b])').forEach(btn => {
			btn.dataset.b = '1'
			btn.addEventListener('click', () => {
				const code = decode(btn.dataset.enc)
				container.dispatchEvent(
					new CustomEvent('ai-panel-insert', {
						detail: { code }
					})
				)
				const origHTML = btn.innerHTML
				btn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>inserted!`
				btn.classList.add('inserted')
				setTimeout(() => {
					btn.innerHTML = origHTML
					btn.classList.remove('inserted')
				}, 1800)
			})
		})
	}

	/* ── Clipboard ────────────────────────────────── */
	function copyText(text, btn) {
		const done = () => {
			if (!btn) return
			const orig = btn.innerHTML
			btn.innerHTML = `<svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> copied!`
			btn.classList.add('copied')
			setTimeout(() => {
				btn.innerHTML = orig
				btn.classList.remove('copied')
			}, 1800)
		}

		const alternativeCopy = () => {
			const ta = Object.assign(createEl('textarea'), {
				value: text
			})
			ta.style.cssText = 'position:fixed;opacity:0'
			doc.body.appendChild(ta)
			ta.select()
			doc.execCommand('copy')
			ta.remove()
			done()
		}

		if (navigator.clipboard)
			navigator.clipboard.writeText(text).then(done).catch(alternativeCopy)
		else alternativeCopy()
	}

	/* ── Helpers ──────────────────────────────────── */
	function esc(s) {
		return String(s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
	}
	function decode(enc) {
		try {
			return decodeURIComponent(escape(atob(enc)))
		} catch (e) {
			return ''
		}
	}
	function scrollBottom() {
		msgsWrap.scrollTop = msgsWrap.scrollHeight
	}

	/* ── Public API for main.js ───────────────────── */
	window.aiPanel = {
		addContext: (name, content) => {
			ctxFiles.push({ name, content })
			renderCtxBar()
		},
		clearContext: () => {
			ctxFiles = []
			renderCtxBar()
		},
		setModel: m => {
			modelSel.value = m
		},
		clear: () => {
			messages = []
			renderAll()
		}
	}

	renderCtxBar()
	renderAll()
	inputEl.focus()
}

export { renderPanel }
