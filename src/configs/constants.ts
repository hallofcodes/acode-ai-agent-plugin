export const PLUGIN_ID = 'hallofcodes.rutex.ai_agent'
export const AI_SETTINGS_STORAGE_KEY = 'rutex-ai-agent:ai-settings'
export const CHAT_HISTORY_PREFIX = 'rutex-ai-agent-chat-history:'
export const LAST_ACTIVE_CHAT_HISTORY_KEY =
	'rutex-ai-agent-chat-history-last-active'

export const RANDOM_RESPONSES: readonly string[] = [
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
