import { ProviderModelMeta } from './types'

export default [
	{
		id: 'claude-opus-4-6',
		label: 'Claude Opus 4.6',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Deep reasoning', 'Complex planning', 'Long-form output'],
		notes: 'Highest quality Claude model.'
	},
	{
		id: 'claude-sonnet-4-6',
		label: 'Claude Sonnet 4.6',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Coding tasks', 'Analysis', 'Agentic workflows'],
		notes: 'Default high-quality Claude option.'
	},
	{
		id: 'claude-sonnet-4-5',
		label: 'Claude Sonnet 4.5',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Code review', 'Balanced quality/speed', 'Daily development'],
		notes: 'Strong balance for everyday coding and chat usage.'
	},
	{
		id: 'claude-3-7-sonnet',
		label: 'Claude 3.7 Sonnet',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Reasoning', 'Code generation', 'Detailed explanations'],
		notes: 'Reasoning-capable Claude Sonnet generation.'
	},
	{
		id: 'claude-3-5-sonnet',
		label: 'Claude 3.5 Sonnet',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Fast coding help',
			'General assistant tasks',
			'Lower cost quality'
		],
		notes: 'Cost-efficient Sonnet option still suitable for coding.'
	},
	{
		id: 'claude-3-5-haiku',
		label: 'Claude 3.5 Haiku',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Low-latency responses', 'Quick fixes', 'Lightweight chats'],
		notes: 'Fast Claude model for rapid request/response loops.'
	},
	{
		id: 'claude-haiku-4-5',
		label: 'Claude Haiku 4.5',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Fast responses', 'Low-latency tasks', 'Lightweight chats'],
		notes: 'Best speed/cost profile in Claude family.'
	}
] as const satisfies ProviderModelMeta[]
