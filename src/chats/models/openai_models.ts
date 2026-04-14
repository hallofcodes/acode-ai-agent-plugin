import { ProviderModelMeta } from './types'

export default [
	{
		id: 'gpt-5.3-codex',
		label: 'GPT-5.3 Codex',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Code generation', 'Repository edits', 'Agentic coding'],
		notes: 'Codex-tuned GPT-5 family model for software engineering workflows.'
	},
	{
		id: 'gpt-5.2-codex',
		label: 'GPT-5.2 Codex',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Code refactors', 'Bug fixing', 'Tool-driven coding tasks'],
		notes: 'Reliable Codex model for iterative coding assistance.'
	},
	{
		id: 'gpt-5.4',
		label: 'GPT-5.4 (Flagship)',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Agentic tasks', 'Computer use', 'Complex reasoning'],
		notes: 'Latest frontier model with native computer-use capabilities and unified Codex logic.'
	},
	{
		id: 'gpt-5.4-pro',
		label: 'GPT-5.4 Pro',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'Frontier reasoning',
			'Complex architecture',
			'Hard coding tasks'
		],
		notes: 'Premium variant with 5-level reasoning effort control and superior SWE-bench scores.'
	},
	{
		id: 'gpt-5-mini',
		label: 'GPT-5 Mini',
		contextWindow: '128K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Fast chats', 'Affordable reasoning', 'Summarization'],
		notes: 'Replaced GPT-4.1 mini as the standard high-efficiency model.'
	},
	{
		id: 'gpt-4o',
		label: 'GPT-4o',
		contextWindow: '128K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['General chat', 'Code generation', 'Multimodal workflows'],
		notes: 'Balanced speed and quality.'
	},
	{
		id: 'gpt-4.1',
		label: 'GPT-4.1',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context coding', 'Complex reasoning', 'Tool use'],
		notes: 'Great for large codebase understanding.'
	},
	{
		id: 'gpt-4.1-mini',
		label: 'GPT-4.1 Mini',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Fast coding', 'Lower-cost automation', 'Long context'],
		notes: 'Faster and cheaper GPT-4.1 variant.'
	},
	{
		id: 'o3',
		label: 'o3',
		contextWindow: '200K tokens',
		maxOutputTokens: '100K tokens',
		bestFor: ['Deep reasoning', 'Planning', 'Difficult bug analysis'],
		notes: 'Strong deliberative reasoning model.'
	},
	{
		id: 'o4-mini',
		label: 'o4-mini',
		contextWindow: '200K tokens',
		maxOutputTokens: '100K tokens',
		bestFor: ['Fast reasoning', 'Lower-cost automation', 'Structured tasks'],
		notes: 'Reasoning optimized with lower latency.'
	}
] as const satisfies ProviderModelMeta[]
