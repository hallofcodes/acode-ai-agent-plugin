import { ProviderModelMeta } from './types'

export default [
	{
		id: 'gemini-3.1-pro-preview',
		label: 'Gemini 3.1 Pro',
		contextWindow: '1M tokens',
		maxOutputTokens: '200K tokens',
		bestFor: ['Advanced reasoning', 'Agentic workflows', 'Complex coding'],
		notes: 'Flagship model with "Thinking" mode and 200k max output.'
	},
	{
		id: 'gemini-3.1-flash-lite-preview',
		label: 'Gemini 3.1 Flash',
		contextWindow: '1M tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Fast coding', 'Everyday chat', 'Large-context tasks'],
		notes: 'Balanced Gemini 3.1 model with strong speed and context handling.'
	},
	{
		id: 'gemini-3-flash-preview',
		label: 'Gemini 3 Flash',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Fast coding', 'Real-time apps', 'High-volume tasks'],
		notes: 'Frontier-class performance with high speed.'
	},
	{
		id: 'gemini-2.5-pro-preview',
		label: 'Gemini 2.5 Pro Preview',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Complex reasoning', 'Architecture decisions', 'Long contexts'],
		notes: 'Preview tier for the Gemini 2.5 Pro line.'
	},
	{
		id: 'gemini-3.1-flash-lite-preview',
		label: 'Gemini 3.1 Flash-Lite',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Cost-sensitive tasks', 'High throughput', 'Simple chat'],
		notes: 'Most economical option in the Gemini 3 series.'
	},
	{
		id: 'gemini-2.5-flash-thinking',
		label: 'Gemini 2.5 Flash Thinking',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Reasoning', 'Coding help', 'Tool-heavy apps'],
		notes: 'Flash model with stronger reasoning behavior.'
	},
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
		id: 'gemini-2.0-flash',
		label: 'Gemini 2.0 Flash',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Quick answers', 'Coding help', 'General chat'],
		notes: 'Reliable fast model for everyday use.'
	},
	{
		id: 'gemini-2.0-flash-lite',
		label: 'Gemini 2.0 Flash-Lite',
		contextWindow: '1M tokens',
		maxOutputTokens: '64K tokens',
		bestFor: ['Low-cost tasks', 'High-volume chat', 'Simple assistance'],
		notes: 'Cheaper fast model for lightweight requests.'
	}
] as const satisfies ProviderModelMeta[]
