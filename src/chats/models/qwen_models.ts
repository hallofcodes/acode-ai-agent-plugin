import { ProviderModelMeta } from './types'

export default [
	{
		id: 'deepseek-chat',
		label: 'DeepSeek Chat',
		contextWindow: '64K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['General coding', 'Q&A', 'Low-cost conversations'],
		notes: 'Good default for everyday tasks.'
	},
	{
		id: 'deepseek-reasoner',
		label: 'DeepSeek Reasoner',
		contextWindow: '64K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Reasoning-heavy problems', 'Math/logic', 'Stepwise analysis'],
		notes: 'Emphasizes reasoning over speed.'
	}
] as const satisfies ProviderModelMeta[]
