import { ProviderModelMeta } from './types'

const openRouterModels: ProviderModelMeta[] = [
	{
		id: 'anthropic/claude-haiku-base',
		label: 'Anthropic / Claude Haiku Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'anthropic/claude-haiku-mini',
		label: 'Anthropic / Claude Haiku Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'anthropic/claude-haiku-nano',
		label: 'Anthropic / Claude Haiku Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'anthropic/claude-haiku-pro',
		label: 'Anthropic / Claude Haiku Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'anthropic/claude-haiku-small',
		label: 'Anthropic / Claude Haiku Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'anthropic/claude-haiku-ultra',
		label: 'Anthropic / Claude Haiku Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Claude family for quick responses and lightweight automation. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-base',
		label: 'Anthropic / Claude Instant Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-mini',
		label: 'Anthropic / Claude Instant Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-nano',
		label: 'Anthropic / Claude Instant Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-pro',
		label: 'Anthropic / Claude Instant Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-small',
		label: 'Anthropic / Claude Instant Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'anthropic/claude-instant-ultra',
		label: 'Anthropic / Claude Instant Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency assistant family for short request/response loops. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-base',
		label: 'Anthropic / Claude Opus Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-mini',
		label: 'Anthropic / Claude Opus Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-nano',
		label: 'Anthropic / Claude Opus Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-pro',
		label: 'Anthropic / Claude Opus Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-small',
		label: 'Anthropic / Claude Opus Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'anthropic/claude-opus-ultra',
		label: 'Anthropic / Claude Opus Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Top-tier Claude family for deep reasoning and complex long-form analysis. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-base',
		label: 'Anthropic / Claude Reasoning Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-mini',
		label: 'Anthropic / Claude Reasoning Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-nano',
		label: 'Anthropic / Claude Reasoning Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-pro',
		label: 'Anthropic / Claude Reasoning Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-small',
		label: 'Anthropic / Claude Reasoning Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'anthropic/claude-reasoning-ultra',
		label: 'Anthropic / Claude Reasoning Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-tuned Claude family focused on deliberate problem solving. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-base',
		label: 'Anthropic / Claude Sonnet Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-mini',
		label: 'Anthropic / Claude Sonnet Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-nano',
		label: 'Anthropic / Claude Sonnet Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-pro',
		label: 'Anthropic / Claude Sonnet Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-small',
		label: 'Anthropic / Claude Sonnet Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'anthropic/claude-sonnet-ultra',
		label: 'Anthropic / Claude Sonnet Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Claude family for coding quality, speed, and instruction following. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-base',
		label: 'Cohere / Command Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-mini',
		label: 'Cohere / Command Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-nano',
		label: 'Cohere / Command Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-pro',
		label: 'Cohere / Command Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-small',
		label: 'Cohere / Command Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'cohere/command-coder-ultra',
		label: 'Cohere / Command Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Command family for implementation workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-base',
		label: 'Cohere / Command Fast Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-mini',
		label: 'Cohere / Command Fast Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-nano',
		label: 'Cohere / Command Fast Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-pro',
		label: 'Cohere / Command Fast Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-small',
		label: 'Cohere / Command Fast Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'cohere/command-fast-ultra',
		label: 'Cohere / Command Fast Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Low-latency Command family for interactive assistant loops. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'cohere/command-long-base',
		label: 'Cohere / Command Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'cohere/command-long-mini',
		label: 'Cohere / Command Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'cohere/command-long-nano',
		label: 'Cohere / Command Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'cohere/command-long-pro',
		label: 'Cohere / Command Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'cohere/command-long-small',
		label: 'Cohere / Command Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'cohere/command-long-ultra',
		label: 'Cohere / Command Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Command family for large-source comprehension. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'cohere/command-r-base',
		label: 'Cohere / Command R Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'cohere/command-r-mini',
		label: 'Cohere / Command R Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'cohere/command-r-nano',
		label: 'Cohere / Command R Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-base',
		label: 'Cohere / Command R Plus Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-mini',
		label: 'Cohere / Command R Plus Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-nano',
		label: 'Cohere / Command R Plus Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-pro',
		label: 'Cohere / Command R Plus Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-small',
		label: 'Cohere / Command R Plus Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'cohere/command-r-plus-ultra',
		label: 'Cohere / Command R Plus Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Command family for stronger reasoning and synthesis. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'cohere/command-r-pro',
		label: 'Cohere / Command R Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'cohere/command-r-small',
		label: 'Cohere / Command R Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'cohere/command-r-ultra',
		label: 'Cohere / Command R Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Retrieval-optimized Command family for enterprise RAG tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-base',
		label: 'DeepSeek / Deepseek Chat Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-mini',
		label: 'DeepSeek / Deepseek Chat Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-nano',
		label: 'DeepSeek / Deepseek Chat Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-pro',
		label: 'DeepSeek / Deepseek Chat Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-small',
		label: 'DeepSeek / Deepseek Chat Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-chat-ultra',
		label: 'DeepSeek / Deepseek Chat Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General assistant DeepSeek family for everyday coding requests. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-base',
		label: 'DeepSeek / Deepseek Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-mini',
		label: 'DeepSeek / Deepseek Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-nano',
		label: 'DeepSeek / Deepseek Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-pro',
		label: 'DeepSeek / Deepseek Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-small',
		label: 'DeepSeek / Deepseek Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-coder-ultra',
		label: 'DeepSeek / Deepseek Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-oriented DeepSeek family for code generation and repair. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-base',
		label: 'DeepSeek / Deepseek Lite Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-mini',
		label: 'DeepSeek / Deepseek Lite Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-nano',
		label: 'DeepSeek / Deepseek Lite Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-pro',
		label: 'DeepSeek / Deepseek Lite Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-small',
		label: 'DeepSeek / Deepseek Lite Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-lite-ultra',
		label: 'DeepSeek / Deepseek Lite Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient DeepSeek family for low-latency, lower-cost usage. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-base',
		label: 'DeepSeek / Deepseek Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-mini',
		label: 'DeepSeek / Deepseek Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-nano',
		label: 'DeepSeek / Deepseek Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-pro',
		label: 'DeepSeek / Deepseek Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-small',
		label: 'DeepSeek / Deepseek Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-long-ultra',
		label: 'DeepSeek / Deepseek Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context DeepSeek family for repository and document analysis. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-base',
		label: 'DeepSeek / Deepseek Reasoner Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-mini',
		label: 'DeepSeek / Deepseek Reasoner Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-nano',
		label: 'DeepSeek / Deepseek Reasoner Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-pro',
		label: 'DeepSeek / Deepseek Reasoner Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-small',
		label: 'DeepSeek / Deepseek Reasoner Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-reasoner-ultra',
		label: 'DeepSeek / Deepseek Reasoner Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning DeepSeek family for deliberate multi-step solutions. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'google/gemini-code-base',
		label: 'Google / Gemini Code Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'google/gemini-code-mini',
		label: 'Google / Gemini Code Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'google/gemini-code-nano',
		label: 'Google / Gemini Code Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'google/gemini-code-pro',
		label: 'Google / Gemini Code Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'google/gemini-code-small',
		label: 'Google / Gemini Code Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'google/gemini-code-ultra',
		label: 'Google / Gemini Code Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Gemini family for implementation and refactor tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-base',
		label: 'Google / Gemini Flash Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-mini',
		label: 'Google / Gemini Flash Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-nano',
		label: 'Google / Gemini Flash Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-pro',
		label: 'Google / Gemini Flash Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-small',
		label: 'Google / Gemini Flash Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'google/gemini-flash-ultra',
		label: 'Google / Gemini Flash Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-throughput Gemini family for low-latency coding assistance. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-base',
		label: 'Google / Gemini Multimodal Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-mini',
		label: 'Google / Gemini Multimodal Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-nano',
		label: 'Google / Gemini Multimodal Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-pro',
		label: 'Google / Gemini Multimodal Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-small',
		label: 'Google / Gemini Multimodal Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'google/gemini-multimodal-ultra',
		label: 'Google / Gemini Multimodal Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Gemini family for image-aware and mixed-input workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-base',
		label: 'Google / Gemini Pro Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-mini',
		label: 'Google / Gemini Pro Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-nano',
		label: 'Google / Gemini Pro Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-pro',
		label: 'Google / Gemini Pro Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-small',
		label: 'Google / Gemini Pro Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'google/gemini-pro-ultra',
		label: 'Google / Gemini Pro Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-quality Gemini family suited for reasoning, architecture, and large context. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-base',
		label: 'Google / Gemini Thinking Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-mini',
		label: 'Google / Gemini Thinking Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-nano',
		label: 'Google / Gemini Thinking Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-pro',
		label: 'Google / Gemini Thinking Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-small',
		label: 'Google / Gemini Thinking Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'google/gemini-thinking-ultra',
		label: 'Google / Gemini Thinking Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Thinking-focused Gemini family for multi-step problem solving. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-base',
		label: 'Meta Llama / Llama 3 Reasoning Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-mini',
		label: 'Meta Llama / Llama 3 Reasoning Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-nano',
		label: 'Meta Llama / Llama 3 Reasoning Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-pro',
		label: 'Meta Llama / Llama 3 Reasoning Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-small',
		label: 'Meta Llama / Llama 3 Reasoning Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3-reasoning-ultra',
		label: 'Meta Llama / Llama 3 Reasoning Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Llama family for structured analytical tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-base',
		label: 'Meta Llama / Llama 3.1 Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-mini',
		label: 'Meta Llama / Llama 3.1 Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-nano',
		label: 'Meta Llama / Llama 3.1 Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-pro',
		label: 'Meta Llama / Llama 3.1 Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-small',
		label: 'Meta Llama / Llama 3.1 Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-coder-ultra',
		label: 'Meta Llama / Llama 3.1 Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-oriented Llama family optimized for generation and edits. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-base',
		label: 'Meta Llama / Llama 3.1 Instruct Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-mini',
		label: 'Meta Llama / Llama 3.1 Instruct Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-nano',
		label: 'Meta Llama / Llama 3.1 Instruct Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-pro',
		label: 'Meta Llama / Llama 3.1 Instruct Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-small',
		label: 'Meta Llama / Llama 3.1 Instruct Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.1-instruct-ultra',
		label: 'Meta Llama / Llama 3.1 Instruct Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General instruction-tuned Llama family for broad assistant usage. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-base',
		label: 'Meta Llama / Llama 3.2 Vision Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-mini',
		label: 'Meta Llama / Llama 3.2 Vision Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-nano',
		label: 'Meta Llama / Llama 3.2 Vision Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-pro',
		label: 'Meta Llama / Llama 3.2 Vision Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-small',
		label: 'Meta Llama / Llama 3.2 Vision Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-3.2-vision-ultra',
		label: 'Meta Llama / Llama 3.2 Vision Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Vision-capable Llama family for multimodal analysis tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-base',
		label: 'Meta Llama / Llama Guard Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-mini',
		label: 'Meta Llama / Llama Guard Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-nano',
		label: 'Meta Llama / Llama Guard Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-pro',
		label: 'Meta Llama / Llama Guard Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-small',
		label: 'Meta Llama / Llama Guard Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'meta-llama/llama-guard-ultra',
		label: 'Meta Llama / Llama Guard Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Safety and moderation family for policy and filtering assistance. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-base',
		label: 'Microsoft / Phi Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-mini',
		label: 'Microsoft / Phi Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-nano',
		label: 'Microsoft / Phi Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-pro',
		label: 'Microsoft / Phi Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-small',
		label: 'Microsoft / Phi Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'microsoft/phi-coder-ultra',
		label: 'Microsoft / Phi Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Developer-oriented Phi family for code editing and generation. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-base',
		label: 'Microsoft / Phi Fast Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-mini',
		label: 'Microsoft / Phi Fast Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-nano',
		label: 'Microsoft / Phi Fast Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-pro',
		label: 'Microsoft / Phi Fast Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-small',
		label: 'Microsoft / Phi Fast Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'microsoft/phi-fast-ultra',
		label: 'Microsoft / Phi Fast Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast Phi family for iterative chatbot interactions. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-base',
		label: 'Microsoft / Phi Instruct Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-mini',
		label: 'Microsoft / Phi Instruct Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-nano',
		label: 'Microsoft / Phi Instruct Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-pro',
		label: 'Microsoft / Phi Instruct Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-small',
		label: 'Microsoft / Phi Instruct Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'microsoft/phi-instruct-ultra',
		label: 'Microsoft / Phi Instruct Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Compact Phi instruction family for lightweight general tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-base',
		label: 'Microsoft / Phi Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-mini',
		label: 'Microsoft / Phi Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-nano',
		label: 'Microsoft / Phi Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-pro',
		label: 'Microsoft / Phi Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-small',
		label: 'Microsoft / Phi Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'microsoft/phi-long-ultra',
		label: 'Microsoft / Phi Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Phi family for larger prompt windows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-base',
		label: 'Microsoft / Phi Reasoning Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-mini',
		label: 'Microsoft / Phi Reasoning Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-nano',
		label: 'Microsoft / Phi Reasoning Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-pro',
		label: 'Microsoft / Phi Reasoning Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-small',
		label: 'Microsoft / Phi Reasoning Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'microsoft/phi-reasoning-ultra',
		label: 'Microsoft / Phi Reasoning Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Phi family for logic-heavy workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-base',
		label: 'Mistral AI / Codestral Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-mini',
		label: 'Mistral AI / Codestral Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-nano',
		label: 'Mistral AI / Codestral Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-pro',
		label: 'Mistral AI / Codestral Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-small',
		label: 'Mistral AI / Codestral Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'mistralai/codestral-ultra',
		label: 'Mistral AI / Codestral Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-centric Mistral family aimed at developer productivity tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-base',
		label: 'Mistral AI / Mistral Large Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-mini',
		label: 'Mistral AI / Mistral Large Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-nano',
		label: 'Mistral AI / Mistral Large Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-pro',
		label: 'Mistral AI / Mistral Large Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-small',
		label: 'Mistral AI / Mistral Large Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-large-ultra',
		label: 'Mistral AI / Mistral Large Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Highest quality Mistral family for difficult reasoning workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-base',
		label: 'Mistral AI / Mistral Medium Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-mini',
		label: 'Mistral AI / Mistral Medium Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-nano',
		label: 'Mistral AI / Mistral Medium Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-pro',
		label: 'Mistral AI / Mistral Medium Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-small',
		label: 'Mistral AI / Mistral Medium Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-medium-ultra',
		label: 'Mistral AI / Mistral Medium Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Balanced Mistral family for general coding and chat tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-base',
		label: 'Mistral AI / Mistral Small Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-mini',
		label: 'Mistral AI / Mistral Small Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-nano',
		label: 'Mistral AI / Mistral Small Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-pro',
		label: 'Mistral AI / Mistral Small Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-small',
		label: 'Mistral AI / Mistral Small Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'mistralai/mistral-small-ultra',
		label: 'Mistral AI / Mistral Small Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Fast compact Mistral family for responsive low-cost interactions. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-base',
		label: 'Mistral AI / Pixtral Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-mini',
		label: 'Mistral AI / Pixtral Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-nano',
		label: 'Mistral AI / Pixtral Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-pro',
		label: 'Mistral AI / Pixtral Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-small',
		label: 'Mistral AI / Pixtral Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'mistralai/pixtral-ultra',
		label: 'Mistral AI / Pixtral Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Mistral family for image-plus-text assistant flows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-base',
		label: 'NVIDIA / Nemotron Chat Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-mini',
		label: 'NVIDIA / Nemotron Chat Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-nano',
		label: 'NVIDIA / Nemotron Chat Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-pro',
		label: 'NVIDIA / Nemotron Chat Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-small',
		label: 'NVIDIA / Nemotron Chat Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-chat-ultra',
		label: 'NVIDIA / Nemotron Chat Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron chat family for general instruction-following tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-base',
		label: 'NVIDIA / Nemotron Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-mini',
		label: 'NVIDIA / Nemotron Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-nano',
		label: 'NVIDIA / Nemotron Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-pro',
		label: 'NVIDIA / Nemotron Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-small',
		label: 'NVIDIA / Nemotron Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-coder-ultra',
		label: 'NVIDIA / Nemotron Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron coding family for software engineering workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-base',
		label: 'NVIDIA / Nemotron Fast Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-mini',
		label: 'NVIDIA / Nemotron Fast Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-nano',
		label: 'NVIDIA / Nemotron Fast Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-pro',
		label: 'NVIDIA / Nemotron Fast Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-small',
		label: 'NVIDIA / Nemotron Fast Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-fast-ultra',
		label: 'NVIDIA / Nemotron Fast Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient Nemotron family for low-latency interactions. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-base',
		label: 'NVIDIA / Nemotron Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-mini',
		label: 'NVIDIA / Nemotron Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-nano',
		label: 'NVIDIA / Nemotron Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-pro',
		label: 'NVIDIA / Nemotron Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-small',
		label: 'NVIDIA / Nemotron Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-long-ultra',
		label: 'NVIDIA / Nemotron Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Nemotron family for retrieval-heavy tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-base',
		label: 'NVIDIA / Nemotron Reasoning Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-mini',
		label: 'NVIDIA / Nemotron Reasoning Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-nano',
		label: 'NVIDIA / Nemotron Reasoning Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-pro',
		label: 'NVIDIA / Nemotron Reasoning Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-small',
		label: 'NVIDIA / Nemotron Reasoning Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'nvidia/nemotron-reasoning-ultra',
		label: 'NVIDIA / Nemotron Reasoning Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Nemotron reasoning family for deep problem analysis. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-base',
		label: 'OpenAI / Gpt 4.1 Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini',
		label: 'OpenAI / Gpt 4.1 Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-base',
		label: 'OpenAI / Gpt 4.1 Mini Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-mini',
		label: 'OpenAI / Gpt 4.1 Mini Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-nano',
		label: 'OpenAI / Gpt 4.1 Mini Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-pro',
		label: 'OpenAI / Gpt 4.1 Mini Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-small',
		label: 'OpenAI / Gpt 4.1 Mini Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-mini-ultra',
		label: 'OpenAI / Gpt 4.1 Mini Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Faster lower-cost variant for iterative development workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-nano',
		label: 'OpenAI / Gpt 4.1 Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-pro',
		label: 'OpenAI / Gpt 4.1 Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-small',
		label: 'OpenAI / Gpt 4.1 Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'openai/gpt-4.1-ultra',
		label: 'OpenAI / Gpt 4.1 Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'High-capability long-context model for complex implementation and review tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-base',
		label: 'OpenAI / Gpt 4o Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-mini',
		label: 'OpenAI / Gpt 4o Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-nano',
		label: 'OpenAI / Gpt 4o Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-pro',
		label: 'OpenAI / Gpt 4o Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-small',
		label: 'OpenAI / Gpt 4o Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'openai/gpt-4o-ultra',
		label: 'OpenAI / Gpt 4o Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General-purpose multimodal model tuned for reliable chat and coding support. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'openai/o3-base',
		label: 'OpenAI / O3 Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'openai/o3-mini',
		label: 'OpenAI / O3 Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'openai/o3-nano',
		label: 'OpenAI / O3 Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'openai/o3-pro',
		label: 'OpenAI / O3 Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'openai/o3-small',
		label: 'OpenAI / O3 Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'openai/o3-ultra',
		label: 'OpenAI / O3 Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-oriented model for difficult planning and debugging tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-base',
		label: 'OpenAI / O4 Mini Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-mini',
		label: 'OpenAI / O4 Mini Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-nano',
		label: 'OpenAI / O4 Mini Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-pro',
		label: 'OpenAI / O4 Mini Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-small',
		label: 'OpenAI / O4 Mini Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'openai/o4-mini-ultra',
		label: 'OpenAI / O4 Mini Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Efficient reasoning model for tool-heavy interactive workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-base',
		label: 'Qwen / Qwen 2.5 Coder Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-mini',
		label: 'Qwen / Qwen 2.5 Coder Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-nano',
		label: 'Qwen / Qwen 2.5 Coder Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-pro',
		label: 'Qwen / Qwen 2.5 Coder Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-small',
		label: 'Qwen / Qwen 2.5 Coder Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-coder-ultra',
		label: 'Qwen / Qwen 2.5 Coder Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Coding-specialized Qwen family for implementation and bug fixing. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-base',
		label: 'Qwen / Qwen 2.5 Instruct Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-mini',
		label: 'Qwen / Qwen 2.5 Instruct Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-nano',
		label: 'Qwen / Qwen 2.5 Instruct Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-pro',
		label: 'Qwen / Qwen 2.5 Instruct Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-small',
		label: 'Qwen / Qwen 2.5 Instruct Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-instruct-ultra',
		label: 'Qwen / Qwen 2.5 Instruct Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Instruction-following Qwen family for broad interactive use. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-base',
		label: 'Qwen / Qwen 2.5 Reasoner Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-mini',
		label: 'Qwen / Qwen 2.5 Reasoner Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-nano',
		label: 'Qwen / Qwen 2.5 Reasoner Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-pro',
		label: 'Qwen / Qwen 2.5 Reasoner Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-small',
		label: 'Qwen / Qwen 2.5 Reasoner Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'qwen/qwen-2.5-reasoner-ultra',
		label: 'Qwen / Qwen 2.5 Reasoner Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning-focused Qwen family for step-by-step analysis. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-base',
		label: 'Qwen / Qwen Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-mini',
		label: 'Qwen / Qwen Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-nano',
		label: 'Qwen / Qwen Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-pro',
		label: 'Qwen / Qwen Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-small',
		label: 'Qwen / Qwen Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'qwen/qwen-long-ultra',
		label: 'Qwen / Qwen Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Qwen family for retrieval and large-document tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-base',
		label: 'Qwen / Qwen Vision Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-mini',
		label: 'Qwen / Qwen Vision Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-nano',
		label: 'Qwen / Qwen Vision Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-pro',
		label: 'Qwen / Qwen Vision Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-small',
		label: 'Qwen / Qwen Vision Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'qwen/qwen-vision-ultra',
		label: 'Qwen / Qwen Vision Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Multimodal Qwen family for image-aware workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-base',
		label: 'xAI / Grok Beta Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-mini',
		label: 'xAI / Grok Beta Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-nano',
		label: 'xAI / Grok Beta Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-pro',
		label: 'xAI / Grok Beta Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-small',
		label: 'xAI / Grok Beta Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'x-ai/grok-beta-ultra',
		label: 'xAI / Grok Beta Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'General Grok family for broad conversational and coding tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-base',
		label: 'xAI / Grok Code Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-mini',
		label: 'xAI / Grok Code Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-nano',
		label: 'xAI / Grok Code Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-pro',
		label: 'xAI / Grok Code Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-small',
		label: 'xAI / Grok Code Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'x-ai/grok-code-ultra',
		label: 'xAI / Grok Code Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Code-focused Grok family for generation and refactor tasks. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-base',
		label: 'xAI / Grok Fast Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-mini',
		label: 'xAI / Grok Fast Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-nano',
		label: 'xAI / Grok Fast Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-pro',
		label: 'xAI / Grok Fast Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-small',
		label: 'xAI / Grok Fast Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'x-ai/grok-fast-ultra',
		label: 'xAI / Grok Fast Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Latency-optimized Grok family for rapid response interactions. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-base',
		label: 'xAI / Grok Long Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-mini',
		label: 'xAI / Grok Long Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-nano',
		label: 'xAI / Grok Long Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-pro',
		label: 'xAI / Grok Long Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-small',
		label: 'xAI / Grok Long Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'x-ai/grok-long-ultra',
		label: 'xAI / Grok Long Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Long-context Grok family for extensive prompt contexts. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-base',
		label: 'xAI / Grok Reasoning Base',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Balanced quality/speed', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Base tier prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-mini',
		label: 'xAI / Grok Reasoning Mini',
		contextWindow: '64K tokens',
		maxOutputTokens: '2K tokens',
		bestFor: ['General chat', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Mini tier prioritizes general chat in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-nano',
		label: 'xAI / Grok Reasoning Nano',
		contextWindow: '32K tokens',
		maxOutputTokens: '1K tokens',
		bestFor: ['Low-latency requests', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Nano tier prioritizes low-latency requests in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-pro',
		label: 'xAI / Grok Reasoning Pro',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Complex reasoning', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Pro tier prioritizes complex reasoning in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-small',
		label: 'xAI / Grok Reasoning Small',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Coding assistance', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Small tier prioritizes coding assistance in plugin workflows.'
	},
	{
		id: 'x-ai/grok-reasoning-ultra',
		label: 'xAI / Grok Reasoning Ultra',
		contextWindow: '512K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-context tasks', 'Code and assistant tasks', 'Tool-driven agent flows'],
		notes: 'Reasoning Grok family for deeper analytical workflows. Ultra tier prioritizes long-context tasks in plugin workflows.'
	},

{
id: 'openai/gpt-5.3-codex',
label: 'OpenAI / GPT-5.3 Codex',
contextWindow: '400K tokens',
maxOutputTokens: '128K tokens',
bestFor: ['Agentic coding', 'Repository-wide edits', 'Complex code transformations'],
notes: 'Codex-tuned GPT-5.3 for advanced software engineering tasks via OpenRouter.'
},
{
id: 'openai/gpt-5.2-codex',
label: 'OpenAI / GPT-5.2 Codex',
contextWindow: '400K tokens',
maxOutputTokens: '128K tokens',
bestFor: ['Code generation', 'Refactoring', 'Tool-driven development flows'],
notes: 'Stable Codex model variant exposed through OpenRouter.'
},
{
id: 'openai/gpt-5.4',
label: 'OpenAI / GPT-5.4',
contextWindow: '400K tokens',
maxOutputTokens: '128K tokens',
bestFor: ['Top-tier reasoning', 'Complex planning', 'High-accuracy coding'],
notes: 'Latest high-capability GPT family entry in this static catalog.'
},
{
id: 'anthropic/claude-opus-4.1',
label: 'Anthropic / Claude Opus 4.1',
contextWindow: '200K tokens',
maxOutputTokens: '8K tokens',
bestFor: ['Deep analysis', 'Long-form synthesis', 'Difficult engineering tasks'],
notes: 'Premium Claude Opus line model available through OpenRouter.'
},
{
id: 'anthropic/claude-3.7-sonnet',
label: 'Anthropic / Claude 3.7 Sonnet',
contextWindow: '200K tokens',
maxOutputTokens: '8K tokens',
bestFor: ['Reasoning', 'Code generation', 'Daily development'],
notes: 'Strong Sonnet generation model included for compatibility and choice.'
},
{
id: 'google/gemini-2.5-pro',
label: 'Google / Gemini 2.5 Pro',
contextWindow: '1M tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Complex reasoning', 'Long context', 'Architecture support'],
notes: 'High-quality Gemini model through OpenRouter with large context window.'
},
{
id: 'google/gemini-2.5-flash-lite',
label: 'Google / Gemini 2.5 Flash-Lite',
contextWindow: '1M tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Cost-aware usage', 'Fast responses', 'High-volume assistant tasks'],
notes: 'Efficient Gemini tier for throughput-oriented workloads.'
},
{
id: 'qwen/qwen3-235b-a22b-thinking-2507',
label: 'Qwen / Qwen3 235B Thinking 2507',
contextWindow: '131K tokens',
maxOutputTokens: '32K tokens',
bestFor: ['Reasoning-heavy prompts', 'Math and logic', 'Multi-step planning'],
notes: 'Qwen3 thinking-focused model family, represented for newer Qwen generation coverage.'
},
{
id: 'qwen/qwen3-coder-480b-a35b-instruct',
label: 'Qwen / Qwen3 Coder 480B Instruct',
contextWindow: '262K tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Large-scale coding', 'Refactoring', 'Repository maintenance'],
notes: 'Large Qwen3 coder model for high-end software engineering tasks.'
},
{
id: 'qwen/qwen3-30b-a3b-instruct-2507',
label: 'Qwen / Qwen3 30B Instruct 2507',
contextWindow: '131K tokens',
maxOutputTokens: '32K tokens',
bestFor: ['General chat', 'Coding assistance', 'Balanced speed and quality'],
notes: 'General-purpose Qwen3 instruct variant included for broader Qwen 3.x availability.'
},
{
id: 'qwen/qwen-3.6-coder',
label: 'Qwen / Qwen 3.6 Coder',
contextWindow: '262K tokens',
maxOutputTokens: '64K tokens',
bestFor: ['Modern coding tasks', 'Tool use', 'High-context development'],
notes: 'Catalog placeholder for Qwen 3.6 coder line requested by users.'
},
]

export default openRouterModels
