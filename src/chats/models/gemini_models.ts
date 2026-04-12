import { ProviderModelMeta } from './types'

const geminiModels: ProviderModelMeta[] = [
{
id: 'gemini-2.5-pro',
label: 'Gemini 2.5 Pro',
contextWindow: '1M tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Complex reasoning', 'Architecture decisions', 'Long contexts'],
notes: 'Higher quality than Flash for hard tasks.'
},
{
id: 'gemini-2.5-flash',
label: 'Gemini 2.5 Flash',
contextWindow: '1M tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Fast coding help', 'General chat', 'Tool-heavy apps'],
notes: 'Great default for speed and cost.'
},
{
id: 'gemini-2.5-flash-lite',
label: 'Gemini 2.5 Flash-Lite',
contextWindow: '1M tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Low-cost requests', 'High throughput', 'Simple coding tasks'],
notes: 'Economical Gemini option for frequent interactions.'
},
{
id: 'gemini-2.0-pro',
label: 'Gemini 2.0 Pro',
contextWindow: '1M tokens',
maxOutputTokens: '8K tokens',
bestFor: ['General reasoning', 'Code understanding', 'Long prompts'],
notes: 'Older but stable high-capability Gemini series model.'
},
{
id: 'gemini-2.0-flash',
label: 'Gemini 2.0 Flash',
contextWindow: '1M tokens',
maxOutputTokens: '8K tokens',
bestFor: ['Low-latency requests', 'Basic edits', 'Interactive sessions'],
notes: 'Reliable low-latency model.'
},
{
id: 'gemini-1.5-pro',
label: 'Gemini 1.5 Pro',
contextWindow: '1M tokens',
maxOutputTokens: '8K tokens',
bestFor: ['Large document understanding', 'RAG tasks', 'Long-context analysis'],
notes: 'Widely used long-context Gemini baseline.'
}
]

export default geminiModels
