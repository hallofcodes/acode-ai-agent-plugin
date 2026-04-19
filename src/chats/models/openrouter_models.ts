import { ProviderModelMeta } from './types'

export default [
	// ─── Anthropic ─────────────────────────────────────────────────────────────────
	// ════════════════════════════════════════════════════
	// Claude 4.x — Opus (Latest flagship, 2026)
	// ════════════════════════════════════════════════════
	{
		id: 'anthropic/claude-opus-4.6-fast',
		label: 'Anthropic / Claude Opus 4.6 (Fast)',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Long-running agents', 'Large codebases', 'Complex refactors'],
		notes: 'Fast-mode Opus 4.6. Same capabilities, up to 2.5x higher output speed at 6x premium pricing. $30/$150 per million tokens.'
	},
	{
		id: 'anthropic/claude-opus-4.6',
		label: 'Anthropic / Claude Opus 4.6',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Agentic coding',
			'Complex multi-step tasks',
			'Long professional work'
		],
		notes: 'Strongest Claude for coding and long-running workflows. Deep contextual understanding, strong problem decomposition. $5/$25 per million tokens.'
	},
	{
		id: 'anthropic/claude-sonnet-4.6',
		label: 'Anthropic / Claude Sonnet 4.6',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Iterative development',
			'Codebase navigation',
			'Agent workflows'
		],
		notes: 'Most capable Sonnet. Frontier coding performance, project management with memory, computer use. Best value Claude for agents. $3/$15 per million tokens.'
	},
	{
		id: 'anthropic/claude-opus-4.5',
		label: 'Anthropic / Claude Opus 4.5',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Complex software engineering',
			'Long-horizon computer use',
			'Multi-agent setups'
		],
		notes: 'Frontier reasoning model. Configurable effort levels via Verbosity param (low/medium/high). Strong on agentic debugging and multi-step planning. $5/$25 per million tokens.'
	},
	{
		id: 'anthropic/claude-haiku-4.5',
		label: 'Anthropic / Claude Haiku 4.5',
		contextWindow: '200K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Real-time responses', 'Sub-agents', 'High-volume workflows'],
		notes: 'Fastest and cheapest Claude. 73%+ on SWE-bench. Extended thinking support. Best for parallelized sub-agents and scaled deployment. $1/$5 per million tokens.'
	},
	{
		id: 'anthropic/claude-sonnet-4.5',
		label: 'Anthropic / Claude Sonnet 4.5',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Agentic coding',
			'Long-running workflows',
			'Parallel tool execution'
		],
		notes: 'Advanced Sonnet for real-world agents. Speculative parallel execution, efficient context/memory management, strong tool orchestration. $3/$15 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// Claude 4.x — Opus 4.0 / 4.1
	// ════════════════════════════════════════════════════
	{
		id: 'anthropic/claude-opus-4.1',
		label: 'Anthropic / Claude Opus 4.1',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Multi-file refactoring',
			'Research',
			'Data analysis with tools'
		],
		notes: '74.5% SWE-bench Verified. Extended thinking up to 64K tokens. Strong debugging precision and detail-oriented reasoning. $15/$75 per million tokens.'
	},
	{
		id: 'anthropic/claude-opus-4',
		label: 'Anthropic / Claude Opus 4',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Complex long-running tasks',
			'Agent workflows',
			'Software engineering'
		],
		notes: "World's best coding model at launch. 72.5% SWE-bench, 43.2% Terminal-bench. Handles thousands of agent steps for hours without degradation. $15/$75 per million tokens."
	},
	{
		id: 'anthropic/claude-sonnet-4',
		label: 'Anthropic / Claude Sonnet 4',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Everyday coding',
			'Agentic tasks',
			'Complex software development'
		],
		notes: '72.7% SWE-bench. Improved autonomous codebase navigation, reduced agent error rates. Good balance of capability and efficiency. $3/$15 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// Claude 3.7 (Deprecating May 5, 2026 — include for now)
	// ════════════════════════════════════════════════════
	{
		id: 'anthropic/claude-3.7-sonnet',
		label: 'Anthropic / Claude 3.7 Sonnet',
		contextWindow: '200K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Reasoning', 'Front-end coding', 'Agentic workflows'],
		notes: 'Hybrid reasoning model. Choose rapid or extended step-by-step mode. Deprecating May 5, 2026 — consider migrating to Sonnet 4.x. $3/$15 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// Claude 3.5 (Legacy, still active)
	// ════════════════════════════════════════════════════
	{
		id: 'anthropic/claude-3.5-haiku',
		label: 'Anthropic / Claude 3.5 Haiku',
		contextWindow: '200K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Fast chat', 'Code completions', 'Real-time interactions'],
		notes: 'Fast and cheap previous-gen Haiku. Strong tool use and coding accuracy. $0.80/$4 per million tokens.'
	},
	{
		id: 'anthropic/claude-3-haiku',
		label: 'Anthropic / Claude 3 Haiku',
		contextWindow: '200K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Ultra-fast responses', 'Simple tasks', 'High-throughput'],
		notes: 'Oldest active Haiku. Near-instant responsiveness. Cheapest Claude at $0.25/$1.25 per million tokens.'
	},

	// ─── OPENAI ───────────────────────────────────────────────────────────────

	// ════════════════════════════════════════════════════
	// GPT-5.4 Series (Latest, March 2026)
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-5.4',
		label: 'OpenAI / GPT-5.4',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Coding', 'Agentic workflows', 'Multimodal tasks'],
		notes: 'Latest OpenAI flagship. Unifies Codex + GPT lines. 1M context, built-in computer use, 57.7% SWE-Bench Pro. Best default for coding agents. $2.50/$15 per million tokens.'
	},
	{
		id: 'openai/gpt-5.4-pro',
		label: 'OpenAI / GPT-5.4 Pro',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'Advanced reasoning',
			'Complex agentic tasks',
			'High-stakes coding'
		],
		notes: 'Most advanced GPT-5.4 variant. Enhanced reasoning for complex multi-step workflows. Very expensive at $30/$180 per million tokens.'
	},
	{
		id: 'openai/gpt-5.4-mini',
		label: 'OpenAI / GPT-5.4 Mini',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'High-throughput tasks',
			'Coding assistants',
			'Agent workflows'
		],
		notes: 'Faster, cost-efficient GPT-5.4. Strong reasoning, coding, and tool use at lower latency. $0.75/$4.50 per million tokens.'
	},
	{
		id: 'openai/gpt-5-nano',
		label: 'OpenAI / GPT-5 Nano',
		contextWindow: '400K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Ultra-low latency', 'Classification', 'Autocompletion'],
		notes: 'Smallest, fastest GPT-5 variant. Optimized for real-time/cost-sensitive tasks. Successor to GPT-4.1-nano. Very cheap at $0.05/$0.40 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// GPT-5.3 / Codex (Feb 2026)
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-5.3-chat',
		label: 'OpenAI / GPT-5.3 Chat',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'General chat',
			'Document drafting',
			'Structured knowledge work'
		],
		notes: 'GPT-5.3 chat variant. Strong across structured knowledge tasks, spreadsheets, and document workflows.'
	},
	{
		id: 'openai/gpt-5.2-codex',
		label: 'OpenAI / GPT-5.2 Codex',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Agentic coding', 'Large refactors', 'Code review'],
		notes: 'Upgraded Codex for long, independent software engineering tasks. More steerable than 5.1-Codex. Adjustable reasoning effort. $1.75/$14 per million tokens.'
	},
	{
		id: 'openai/gpt-5.2',
		label: 'OpenAI / GPT-5.2',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Reasoning', 'Coding', 'Tool calling'],
		notes: 'Latest GPT-5.2 frontier model. Adaptive reasoning, stronger long-context and agentic performance than GPT-5.1. $1.75/$14 per million tokens.'
	},
	{
		id: 'openai/gpt-5.2-pro',
		label: 'OpenAI / GPT-5.2 Pro',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Complex reasoning', 'High-stakes tasks', 'Coding and writing'],
		notes: 'Most advanced GPT-5.2. Reduced hallucination and sycophancy. Test-time routing support. $21/$168 per million tokens.'
	},
	{
		id: 'openai/gpt-5.2-chat',
		label: 'OpenAI / GPT-5.2 Chat',
		contextWindow: '128K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Low-latency chat',
			'Conversational tasks',
			'High-throughput workloads'
		],
		notes: 'Fast, lightweight GPT-5.2. Adaptive reasoning on harder queries. Warmer conversational tone. $1.75/$14 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// GPT-5.1 Series
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-5.1',
		label: 'OpenAI / GPT-5.1',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Reasoning', 'Coding', 'Structured analysis'],
		notes: 'Primary GPT-5 successor. Adaptive reasoning, improved instruction following and conversational alignment. $1.25/$10 per million tokens.'
	},
	{
		id: 'openai/gpt-5.1-codex',
		label: 'OpenAI / GPT-5.1 Codex',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Agentic coding', 'Code review', 'Multimodal dev tasks'],
		notes: 'Codex specialized for software engineering. Adjustable reasoning effort. Supports image/screenshot input. Integrates with CLI and IDE. $1.25/$10 per million tokens.'
	},
	{
		id: 'openai/gpt-5.1-codex-mini',
		label: 'OpenAI / GPT-5.1 Codex Mini',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'Fast coding tasks',
			'Low-cost agent coding',
			'Tool-driven flows'
		],
		notes: 'Smaller, faster Codex variant. Best value coding model at $0.25/$2 per million tokens.'
	},
	{
		id: 'openai/gpt-5.1-codex-max',
		label: 'OpenAI / GPT-5.1 Codex Max',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: [
			'Long-running engineering tasks',
			'High-context software development'
		],
		notes: 'Highest-capability Codex. Updated reasoning stack, agentic workflows, improved token efficiency. $1.25/$10 per million tokens.'
	},
	{
		id: 'openai/gpt-5.1-chat',
		label: 'OpenAI / GPT-5.1 Chat',
		contextWindow: '128K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Fast chat', 'Interactive workloads', 'Low-latency tasks'],
		notes: 'Lightweight GPT-5.1 for responsive, conversational use. Selectively thinks on harder queries. $1.25/$10 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// GPT-5 Series (Aug 2025)
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-5',
		label: 'OpenAI / GPT-5',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Reasoning', 'Coding', 'Complex instruction following'],
		notes: 'Original GPT-5. Strong step-by-step reasoning, reduced hallucination and sycophancy. $1.25/$10 per million tokens.'
	},
	{
		id: 'openai/gpt-5-mini',
		label: 'OpenAI / GPT-5 Mini',
		contextWindow: '400K tokens',
		maxOutputTokens: '64K tokens',
		bestFor: [
			'Lighter reasoning tasks',
			'Fast general use',
			'Cost-sensitive workloads'
		],
		notes: 'Compact GPT-5. Successor to o4-mini. Full instruction following and safety. $0.25/$2 per million tokens.'
	},
	{
		id: 'openai/gpt-5-codex',
		label: 'OpenAI / GPT-5 Codex',
		contextWindow: '400K tokens',
		maxOutputTokens: '128K tokens',
		bestFor: ['Agentic coding', 'Large-scale refactors', 'Code review'],
		notes: 'GPT-5 specialized for software engineering. Adjustable reasoning effort. Multimodal input support. $1.25/$10 per million tokens.'
	},
	{
		id: 'openai/gpt-5-chat',
		label: 'OpenAI / GPT-5 Chat',
		contextWindow: '128K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Enterprise chat',
			'Multimodal conversations',
			'Context-aware dialogue'
		],
		notes: 'GPT-5 tuned for advanced natural multimodal chat. $1.25/$10 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// GPT-4.1 Series
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-4.1',
		label: 'OpenAI / GPT-4.1',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Software engineering',
			'Long-context reasoning',
			'Agent reliability'
		],
		notes: 'Flagship GPT-4.1. 54.6% SWE-bench Verified. 1M context. Tuned for precise code diffs and long document retrieval. $2/$8 per million tokens.'
	},
	{
		id: 'openai/gpt-4.1-mini',
		label: 'OpenAI / GPT-4.1 Mini',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Interactive apps', 'Coding', 'Vision tasks'],
		notes: 'Mid-sized GPT-4.1. Competitive with GPT-4o at lower cost. 1M context. Strong coding and vision. $0.40/$1.60 per million tokens.'
	},
	{
		id: 'openai/gpt-4.1-nano',
		label: 'OpenAI / GPT-4.1 Nano',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Classification', 'Autocompletion', 'Ultra-low latency'],
		notes: 'Fastest and cheapest GPT-4.1. 1M context. Higher MMLU than GPT-4o mini. $0.10/$0.40 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// o-Series Reasoning Models
	// ════════════════════════════════════════════════════
	{
		id: 'openai/o3',
		label: 'OpenAI / o3',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Math', 'Science', 'Multi-step coding and analysis'],
		notes: 'Powerful reasoning model. New standard for math, science, coding, and visual reasoning. $2/$8 per million tokens.'
	},
	{
		id: 'openai/o4-mini',
		label: 'OpenAI / o4 Mini',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Fast reasoning', 'STEM tasks', 'Code editing'],
		notes: 'Compact o-series reasoning model. 99.5% AIME with Python. Competitive with o3 in many domains. $1.10/$4.40 per million tokens.'
	},
	{
		id: 'openai/o4-mini-high',
		label: 'OpenAI / o4 Mini High',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Hard reasoning tasks', 'Complex STEM', 'Deep code analysis'],
		notes: 'o4-mini with reasoning_effort set to high. More thorough thinking for harder problems.'
	},
	{
		id: 'openai/o3-mini',
		label: 'OpenAI / o3 Mini',
		contextWindow: '200K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['STEM reasoning', 'Math', 'Coding'],
		notes: 'Cost-efficient reasoning model. Adjustable reasoning effort (low/medium/high). Matches o1 on AIME and GPQA at lower cost. $1.10/$4.40 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// Open-Weight GPT-OSS Models (Free tiers available)
	// ════════════════════════════════════════════════════
	{
		id: 'openai/gpt-oss-120b',
		label: 'OpenAI / GPT-OSS 120B',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Agentic tasks', 'Tool calling', 'Reasoning'],
		notes: 'Open-weight MoE model from OpenAI. 117B total, 5.1B active. Configurable reasoning, chain-of-thought, native tool use. Apache 2.0. Free tier available. $0.039/$0.19 per million tokens.'
	},
	{
		id: 'openai/gpt-oss-120b:free',
		label: 'OpenAI / GPT-OSS 120B (free)',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Free-tier agentic tasks', 'Tool calling', 'Reasoning'],
		notes: 'Free variant of GPT-OSS 120B. One of the best free models on OpenRouter. Rate-limited.'
	},
	{
		id: 'openai/gpt-oss-20b',
		label: 'OpenAI / GPT-OSS 20B',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Low-latency inference',
			'Tool calling',
			'Consumer-hardware deployment'
		],
		notes: 'Smaller open-weight OpenAI MoE. 21B total, 3.6B active. Apache 2.0. Runs on consumer GPU. Fine-tunable. Free tier available. $0.02/$0.10 per million tokens.'
	},
	{
		id: 'openai/gpt-oss-20b:free',
		label: 'OpenAI / GPT-OSS 20B (free)',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Free-tier tasks', 'Fast lightweight agent flows'],
		notes: 'Free variant of GPT-OSS 20B. Rate-limited.'
	},
	// ════════════════════════════════════════════════════
	// Cohere — No free tiers. Niche use: RAG + enterprise
	// ════════════════════════════════════════════════════
	{
		id: 'cohere/command-a',
		label: 'Cohere / Command A',
		contextWindow: '256K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Agentic tasks', 'Multilingual', 'RAG workflows'],
		notes: 'Cohere flagship. 111B open-weights model. Strong on RAG, tool use, and multilingual business tasks. Maximum performance with minimum hardware costs. $2.50/$10 per million tokens.'
	},
	{
		id: 'cohere/command-r-plus-08-2024',
		label: 'Cohere / Command R+ (Aug 2024)',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['RAG', 'Tool use', 'Multilingual tasks'],
		notes: '50% higher throughput and 25% lower latency than original Command R+. Good for RAG pipelines. $2.50/$10 per million tokens.'
	},
	{
		id: 'cohere/command-r7b-12-2024',
		label: 'Cohere / Command R7B (Dec 2024)',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Fast RAG', 'Tool use', 'Lightweight agent tasks'],
		notes: 'Small and fast 7B model. Excels at RAG and tool use at very low cost. $0.0375/$0.15 per million tokens — cheapest Cohere model.'
	},

	// ─── DeepSeek ─────────────────────────────────────────────────────────────────
	{
		id: 'deepseek/deepseek-chat',
		label: 'DeepSeek / DeepSeek V3',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Balanced quality/speed',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'General assistant from the DeepSeek V3 family for everyday coding requests. Prioritizes balanced quality/speed in plugin workflows.'
	},
	{
		id: 'deepseek/deepseek-r1-distill-qwen-7b',
		label: 'DeepSeek / R1 Distill Qwen 7B',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: [
			'General chat',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'Lightweight DeepSeek model distilled from R1. Mini tier prioritizing general chat in plugin workflows with lower inference cost.'
	},
	{
		id: 'deepseek/deepseek-v3.2',
		label: 'DeepSeek / DeepSeek V3.2',
		contextWindow: '164K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Advanced reasoning',
			'Code and agent tasks',
			'Tool-driven agent flows'
		],
		notes: 'Latest DeepSeek flagship with sparse attention and strong agentic tool-use. GPT-5 class performance at a fraction of the cost. Supports optional reasoning mode.'
	},

	// ─── GOOGLE ───────────────────────────────────────────────────────────────

	// ── Gemini 3.x (Latest frontier) ─────────────────────
	{
		id: 'google/gemini-3-pro-preview',
		label: 'Google / Gemini 3 Pro Preview',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Complex reasoning', 'Agentic coding', 'Multimodal tasks'],
		notes: 'Google flagship frontier model. State-of-the-art on GPQA, SWE-Bench, and MathArena. Best for hard engineering and agentic workflows.'
	},
	{
		id: 'google/gemini-3-flash-preview',
		label: 'Google / Gemini 3 Flash Preview',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Agentic workflows', 'Multi-turn chat', 'Coding assistance'],
		notes: 'Near Pro-level reasoning at lower latency. Configurable thinking levels. Strong multimodal support including audio, video, and PDFs.'
	},
	// ── Gemini 2.5 ────────────────────────────────────────
	{
		id: 'google/gemini-2.5-pro',
		label: 'Google / Gemini 2.5 Pro',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Advanced reasoning', 'Complex coding', 'Scientific tasks'],
		notes: 'Top-tier reasoning model. #1 on LMArena leaderboard. Supports deep thinking mode for nuanced problem solving.'
	},
	{
		id: 'google/gemini-2.5-flash-lite-preview-09-2025',
		label: 'Google / Gemini 2.5 Flash Lite Preview',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '4K tokens',
		bestFor: [
			'Fast tasks',
			'High-throughput workflows',
			'Low-cost inference'
		],
		notes: 'Lightweight Gemini 2.5. Faster token generation with optional thinking mode. Very cost-effective at $0.10/$0.40 per million tokens.'
	},
	// ── Gemini 2.0 ────────────────────────────────────────
	{
		id: 'google/gemini-2.0-flash-001',
		label: 'Google / Gemini 2.0 Flash',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Multimodal understanding',
			'Code generation',
			'Function calling'
		],
		notes: 'Fast multimodal model with strong instruction following and function calling. Good balance of speed and capability.'
	},
	{
		id: 'google/gemini-2.0-flash-lite-001',
		label: 'Google / Gemini 2.0 Flash Lite',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Fast chat', 'Real-time tasks', 'High-volume operations'],
		notes: 'Fastest Gemini 2.0 variant. Very low latency and economical pricing at $0.075/$0.30 per million tokens.'
	},
	// ── Gemma 4 (Open, free tiers available) ─────────────
	{
		id: 'google/gemma-4-31b-it',
		label: 'Google / Gemma 4 31B',
		contextWindow: '262K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Coding', 'Reasoning', 'Document understanding'],
		notes: 'Dense multimodal open model from Google DeepMind. Supports thinking mode and function calling. Apache 2.0. Free tier available.'
	},
	{
		id: 'google/gemma-4-31b-it:free',
		label: 'Google / Gemma 4 31B (free)',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Coding', 'Reasoning', 'Free-tier tasks'],
		notes: 'Free variant of Gemma 4 31B. Same capabilities — multimodal, thinking mode, function calling. Rate-limited.'
	},
	{
		id: 'google/gemma-4-26b-a4b-it',
		label: 'Google / Gemma 4 26B A4B',
		contextWindow: '262K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Efficient inference', 'Coding', 'Multimodal tasks'],
		notes: 'MoE model — only 3.8B params activate per token, delivering near-31B quality cheaply. Supports video input, thinking mode, function calling.'
	},
	{
		id: 'google/gemma-4-26b-a4b-it:free',
		label: 'Google / Gemma 4 26B A4B (free)',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Efficient inference', 'Free-tier coding', 'Multimodal tasks'],
		notes: 'Free variant of Gemma 4 26B MoE. Near-31B quality at zero cost. Rate-limited.'
	},
	// ── Gemma 3 (Open, free tiers available) ─────────────
	{
		id: 'google/gemma-3-27b-it',
		label: 'Google / Gemma 3 27B',
		contextWindow: '96K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['General assistant', 'Code tasks', 'Multilingual'],
		notes: 'Largest open Gemma 3 model. Multimodal, 140+ languages, function calling. Free tier available.'
	},
	{
		id: 'google/gemma-3-27b-it:free',
		label: 'Google / Gemma 3 27B (free)',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['General assistant', 'Code tasks', 'Free-tier tasks'],
		notes: 'Free variant of Gemma 3 27B. Rate-limited.'
	},
	{
		id: 'google/gemma-3-12b-it',
		label: 'Google / Gemma 3 12B',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Balanced tasks', 'Code', 'Multilingual'],
		notes: 'Mid-size Gemma 3 model. Multimodal with function calling support. Free tier available.'
	},
	{
		id: 'google/gemma-3-12b-it:free',
		label: 'Google / Gemma 3 12B (free)',
		contextWindow: '33K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['General chat', 'Code', 'Free-tier tasks'],
		notes: 'Free variant of Gemma 3 12B. Rate-limited.'
	},
	{
		id: 'google/gemma-3-4b-it',
		label: 'Google / Gemma 3 4B',
		contextWindow: '96K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: [
			'Lightweight tasks',
			'Fast responses',
			'Mobile-class inference'
		],
		notes: 'Small multimodal Gemma 3. Function calling support. Very cheap at ~$0.017/$0.068 per million tokens. Free tier available.'
	},
	{
		id: 'google/gemma-3-4b-it:free',
		label: 'Google / Gemma 3 4B (free)',
		contextWindow: '33K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Lightweight tasks', 'Fast responses', 'Free-tier tasks'],
		notes: 'Free variant of Gemma 3 4B. Rate-limited.'
	},
	{
		id: 'google/gemma-3n-e4b-it',
		label: 'Google / Gemma 3n 4B',
		contextWindow: '33K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['On-device inference', 'Mobile tasks', 'Offline use'],
		notes: 'Mobile-optimized Gemma 3n. Supports text, audio, and visual inputs. PLE caching for efficient memory. 140+ languages. Free tier available.'
	},
	{
		id: 'google/gemma-3n-e4b-it:free',
		label: 'Google / Gemma 3n 4B (free)',
		contextWindow: '8K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['On-device inference', 'Mobile tasks', 'Free-tier tasks'],
		notes: 'Free variant of Gemma 3n 4B. Rate-limited.'
	},
	{
		id: 'google/gemma-3n-e2b-it:free',
		label: 'Google / Gemma 3n 2B (free)',
		contextWindow: '8K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Edge deployment', 'On-device inference', 'Mobile tasks'],
		notes: 'Smallest free mobile-optimized Gemma 3n. 2B effective params on 6B architecture. 140+ languages. MatFormer/Mix-and-Match design.'
	},
	// ── Gemini 1.5 (Older but still active) ──────────────
	{
		id: 'google/gemini-2.0-flash-exp:free',
		label: 'Google / Gemini 2.0 Flash Exp (free)',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Free-tier multimodal', 'Function calling', 'Agent flows'],
		notes: 'Free experimental Gemini 2.0 Flash. Strong multimodal and tool-use capabilities at zero cost. Rate-limited.'
	},
	// ── Gemma 2 (Legacy open models) ─────────────────────
	{
		id: 'google/gemma-2-27b-it',
		label: 'Google / Gemma 2 27B',
		contextWindow: '8K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['General tasks', 'Text generation', 'Q&A'],
		notes: 'Previous-gen open Gemma model. Still capable for general tasks.'
	},
	{
		id: 'google/gemma-2-9b-it',
		label: 'Google / Gemma 2 9B',
		contextWindow: '8K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Lightweight tasks', 'Fast responses', 'General chat'],
		notes: 'Efficient previous-gen Gemma. Good performance-to-cost ratio at $0.03/$0.09 per million tokens.'
	},

	// ─── META LLAMA ───────────────────────────────────────────────────────────────
	{
		id: 'meta-llama/llama-4-maverick',
		label: 'Meta Llama / Llama 4 Maverick',
		contextWindow: '1.05M tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Balanced quality/speed',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'Meta flagship MoE model. 400B total params, 17B active. Native multimodal (text+image). 1M context. Best overall Llama for coding agents.'
	},
	{
		id: 'meta-llama/llama-4-scout',
		label: 'Meta Llama / Llama 4 Scout',
		contextWindow: '328K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'General chat',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'Efficient Llama 4 MoE model. 109B total, 17B active. 10M token context (328K on OpenRouter). Cheap at $0.08/$0.30 per million tokens.'
	},
	// ── Llama 3.3 ─────────────────────────────────────────
	{
		id: 'meta-llama/llama-3.3-70b-instruct',
		label: 'Meta Llama / Llama 3.3 70B Instruct',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Multilingual tasks', 'Code', 'General assistant'],
		notes: 'Best Llama 3.x model. Multilingual (EN, DE, FR, IT, PT, HI, ES, TH). Outperforms many closed models on benchmarks. Free tier available.'
	},
	{
		id: 'meta-llama/llama-3.3-70b-instruct:free',
		label: 'Meta Llama / Llama 3.3 70B Instruct (free)',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Free-tier tasks', 'General assistant', 'Code'],
		notes: 'Free variant of Llama 3.3 70B. Rate-limited. One of the best free models available on OpenRouter.'
	},
	{
		id: 'meta-llama/llama-3.3-8b-instruct',
		label: 'Meta Llama / Llama 3.3 8B Instruct',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Fast responses', 'Lightweight tasks', 'Low latency'],
		notes: 'Ultra-fast lightweight variant of Llama 3.3 70B. Best for when response speed is the top priority.'
	},
	// ── Llama 3.2 ─────────────────────────────────────────
	{
		id: 'meta-llama/llama-3.2-11b-vision-instruct',
		label: 'Meta Llama / Llama 3.2 11B Vision',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Vision tasks', 'Image reasoning', 'Multimodal chat'],
		notes: 'Multimodal Llama with image+text input. Good for visual code review or screenshot-based tasks.'
	},
	{
		id: 'meta-llama/llama-3.2-3b-instruct',
		label: 'Meta Llama / Llama 3.2 3B Instruct',
		contextWindow: '80K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Lightweight tasks', 'Fast inference', 'Edge deployment'],
		notes: 'Small but capable multilingual model. Good for quick tasks where latency matters. Free tier available.'
	},
	{
		id: 'meta-llama/llama-3.2-3b-instruct:free',
		label: 'Meta Llama / Llama 3.2 3B Instruct (free)',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Free-tier lightweight tasks', 'Fast responses'],
		notes: 'Free variant of Llama 3.2 3B. Rate-limited.'
	},
	// ── Llama 3.1 ─────────────────────────────────────────
	{
		id: 'meta-llama/llama-3.1-405b-instruct',
		label: 'Meta Llama / Llama 3.1 405B Instruct',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Complex reasoning', 'High-quality code', 'Hard problems'],
		notes: 'Largest Llama 3.1 model. Comparable to GPT-4o on evaluations. Best open-source quality in the Llama 3.1 family.'
	},
	{
		id: 'meta-llama/llama-3.1-70b-instruct',
		label: 'Meta Llama / Llama 3.1 70B Instruct',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Dialogue', 'Code tasks', 'General assistant'],
		notes: 'Solid mid-size Llama 3.1. Good balance of quality and cost at $0.40/$0.40 per million tokens.'
	},
	{
		id: 'meta-llama/llama-3.1-8b-instruct',
		label: 'Meta Llama / Llama 3.1 8B Instruct',
		contextWindow: '16K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Fast tasks', 'Low-cost inference', 'Simple coding'],
		notes: 'Fast and cheap Llama 3.1. Very low cost at $0.02/$0.05 per million tokens. Good for high-volume simple task.'
	},

	// ─── NVIDIA ───────────────────────────────────────────────────────────────
	{
		id: 'nvidia/nemotron-3-super-120b-a12b',
		label: 'NVIDIA / Nemotron 3 Super 120B',
		contextWindow: '262K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: [
			'Balanced quality/speed',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'NVIDIA flagship MoE model. 120B total, 12B active. Hybrid Mamba-Transformer. Leading scores on AIME 2025, SWE-Bench, TerminalBench. Free tier available.'
	},
	{
		id: 'nvidia/nemotron-3-nano-30b-a3b',
		label: 'NVIDIA / Nemotron 3 Nano 30B',
		contextWindow: '262K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: [
			'General chat',
			'Code and assistant tasks',
			'Tool-driven agent flows'
		],
		notes: 'Small efficient NVIDIA MoE. 30B total, 3B active. Designed for specialized agentic AI. Very cheap at $0.05/$0.20 per million tokens. Free tier available.'
	},

	// ── Additional NVIDIA models ─────────────────────────
	{
		id: 'nvidia/nemotron-3-super-120b-a12b:free',
		label: 'NVIDIA / Nemotron 3 Super 120B (free)',
		contextWindow: '262K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Free-tier agentic tasks', 'Complex reasoning', 'Code'],
		notes: 'Free variant of Nemotron 3 Super. One of the best free models on OpenRouter. Rate-limited.'
	},
	{
		id: 'nvidia/nemotron-3-nano-30b-a3b:free',
		label: 'NVIDIA / Nemotron 3 Nano 30B (free)',
		contextWindow: '256K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Free-tier agentic tasks', 'Lightweight inference'],
		notes: 'Free variant of Nemotron 3 Nano. Rate-limited.'
	},
	{
		id: 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
		label: 'NVIDIA / Llama 3.3 Nemotron Super 49B V1.5',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Reasoning', 'Code', 'RAG and tool calling'],
		notes: 'Derived from Llama 3.3 70B with NAS optimization. Reasoning on/off modes. Strong on MATH500, AIME, LiveCodeBench. Single H100 deployable.'
	},
	{
		id: 'nvidia/nemotron-nano-9b-v2',
		label: 'NVIDIA / Nemotron Nano 9B V2',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Reasoning tasks', 'Fast inference', 'Low-cost tasks'],
		notes: 'Unified reasoning+non-reasoning model trained from scratch by NVIDIA. Reasoning trace controllable via system prompt. Very cheap at $0.04/$0.16 per million tokens. Free tier available.'
	},
	{
		id: 'nvidia/nemotron-nano-9b-v2:free',
		label: 'NVIDIA / Nemotron Nano 9B V2 (free)',
		contextWindow: '128K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: ['Free-tier reasoning', 'Fast responses'],
		notes: 'Free variant of Nemotron Nano 9B V2. Rate-limited.'
	},
	{
		id: 'nvidia/nemotron-nano-12b-v2-vl',
		label: 'NVIDIA / Nemotron Nano 12B VL',
		contextWindow: '131K tokens',
		maxOutputTokens: '4K tokens',
		bestFor: [
			'Vision tasks',
			'Document intelligence',
			'OCR and chart reasoning'
		],
		notes: 'Multimodal vision-language model. Hybrid Transformer-Mamba. Strong on OCRBench, ChartQA, DocVQA. Supports video via Efficient Video Sampling. Free tier available.'
	},
	{
		id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
		label: 'NVIDIA / Llama 3.1 Nemotron Ultra 253B',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Advanced reasoning', 'RAG', 'Complex tool calling'],
		notes: 'Derived from Llama 3.1 405B with NAS. Reasoning on/off via system prompt. Most capable NVIDIA model. Requires 8x H100. $0.60/$1.80 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// QWEN 3.6 (Latest, April 2026)
	// ════════════════════════════════════════════════════
	{
		id: 'qwen/qwen3.6-plus',
		label: 'Qwen / Qwen3.6 Plus',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Agentic coding', 'Front-end development', 'Complex reasoning'],
		notes: 'Latest Qwen flagship. 78.8% SWE-bench Verified. Hybrid MoE + linear attention. Major gains over 3.5 series in coding and reasoning. Free tier available. $0.325/$1.95 per million tokens.'
	},
	{
		id: 'qwen/qwen3.6-plus-preview',
		label: 'Qwen / Qwen3.6 Plus Preview',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: [
			'Agentic coding',
			'Front-end development',
			'Complex problem-solving'
		],
		notes: 'Preview of next-gen Qwen Plus. Stronger reasoning and agentic behavior than 3.5 series. Note: prompts may be logged for model improvement. Free tier available.'
	},

	// ════════════════════════════════════════════════════
	// QWEN 3.5 Series (Feb 2026)
	// ════════════════════════════════════════════════════
	{
		id: 'qwen/qwen3.5-397b-a17b',
		label: 'Qwen / Qwen3.5 397B A17B',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Complex reasoning', 'Code generation', 'Agentic tasks'],
		notes: 'Largest Qwen3.5. Native vision-language MoE. State-of-the-art across language, reasoning, code, and GUI interaction. $0.39/$2.34 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-122b-a10b',
		label: 'Qwen / Qwen3.5 122B A10B',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Reasoning', 'Vision tasks', 'Code'],
		notes: 'Second strongest Qwen3.5. Surpasses Qwen3-235B-2507 in text, and Qwen3-VL-235B in vision. $0.26/$2.08 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-27b',
		label: 'Qwen / Qwen3.5 27B',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Fast responses', 'Vision-language tasks', 'Code'],
		notes: 'Dense Qwen3.5 with linear attention. Performance comparable to 122B-A10B. Fast response times. $0.195/$1.56 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-35b-a3b',
		label: 'Qwen / Qwen3.5 35B A3B',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Efficient inference', 'Vision tasks', 'Code'],
		notes: 'MoE variant comparable to Qwen3.5-27B. Only 3B active params for high efficiency. $0.1625/$1.30 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-9b',
		label: 'Qwen / Qwen3.5 9B',
		contextWindow: '256K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Lightweight tasks', 'Vision reasoning', 'Fast coding'],
		notes: 'Compact multimodal Qwen3.5. Strong reasoning and visual understanding at very low cost. $0.05/$0.15 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-flash-02-23',
		label: 'Qwen / Qwen3.5 Flash',
		contextWindow: '1M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Fast responses',
			'High-throughput tasks',
			'Balanced performance'
		],
		notes: 'Fast hybrid MoE Qwen3.5. Balances inference speed with strong performance. $0.065/$0.26 per million tokens.'
	},
	{
		id: 'qwen/qwen3.5-plus-02-15',
		label: 'Qwen / Qwen3.5 Plus',
		contextWindow: '1M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['General tasks', 'Multimodal', 'Code'],
		notes: 'Hybrid MoE Plus tier. State-of-the-art parity across a wide range of tasks. $0.26/$1.56 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// QWEN3 Coder (Specialized coding models)
	// ════════════════════════════════════════════════════
	{
		id: 'qwen/qwen3-coder',
		label: 'Qwen / Qwen3 Coder 480B A35B',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Agentic coding', 'Function calling', 'Repo-level reasoning'],
		notes: 'Best open coding model on OpenRouter. 480B total, 35B active. Optimized for tool use, function calling, long-context repo tasks. Free tier available. $0.22/$1.00 per million tokens.'
	},
	{
		id: 'qwen/qwen3-coder:free',
		label: 'Qwen / Qwen3 Coder 480B A35B (free)',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Free-tier agentic coding', 'Tool use', 'Repo-level tasks'],
		notes: 'Free variant of the strongest open coding model. Currently rated #1 free coding model on OpenRouter. Rate-limited.'
	},
	{
		id: 'qwen/qwen3-coder-plus',
		label: 'Qwen / Qwen3 Coder Plus',
		contextWindow: '1M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Autonomous programming', 'Tool calling', 'Agent workflows'],
		notes: 'Alibaba proprietary version of Qwen3 Coder 480B. 1M context. Strong agentic coding with tool calling and environment interaction. $0.65/$3.25 per million tokens.'
	},
	{
		id: 'qwen/qwen3-coder-flash',
		label: 'Qwen / Qwen3 Coder Flash',
		contextWindow: '1M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Fast coding tasks', 'Tool use', 'Cost-efficient agents'],
		notes: 'Fast, cheap Coder Plus variant. Good for high-volume coding agent tasks. $0.195/$0.975 per million tokens.'
	},
	{
		id: 'qwen/qwen3-coder-next',
		label: 'Qwen / Qwen3 Coder Next',
		contextWindow: '256K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Local agent deployment', 'Long-horizon coding', 'Tool use'],
		notes: '80B total, 3B active MoE. No thinking mode — clean output ideal for production coding agents. Reliable on long-horizon tasks and tool recovery. $0.15/$0.80 per million tokens.'
	},
	{
		id: 'qwen/qwen3-coder-30b-a3b-instruct',
		label: 'Qwen / Qwen3 Coder 30B A3B',
		contextWindow: '160K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Code generation', 'Function calling', 'Browser use'],
		notes: '30B MoE coder. 256K native context, extensible to 1M. No thinking mode. Good for OpenAI-compatible tool-use workflows. $0.07/$0.27 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// QWEN3 Reasoning / General (2025)
	// ════════════════════════════════════════════════════
	{
		id: 'qwen/qwen3-max-thinking',
		label: 'Qwen / Qwen3 Max Thinking',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Deep multi-step reasoning', 'Math', 'Complex agentic tasks'],
		notes: 'Flagship Qwen3 reasoning model. Deep thinking mode for high-stakes cognitive tasks. Scaled RL for accuracy. $0.78/$3.90 per million tokens.'
	},
	{
		id: 'qwen/qwen3-max',
		label: 'Qwen / Qwen3 Max',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Reasoning', 'Math', 'Multilingual RAG and tool calling'],
		notes: 'Updated Qwen3 Max without thinking mode. Strong across math, coding, logic. Optimized for RAG and tool use. $0.78/$3.90 per million tokens.'
	},
	{
		id: 'qwen/qwen3-235b-a22b-thinking-2507',
		label: 'Qwen / Qwen3 235B A22B Thinking',
		contextWindow: '262K tokens',
		maxOutputTokens: '81K tokens',
		bestFor: ['Structured reasoning', 'Math', 'Long-form generation'],
		notes: 'Open-weight 235B MoE. Thinking-only mode. Top open-source reasoning model. Surpasses many closed models on AIME, LiveCodeBench. $0.13/$0.60 per million tokens.'
	},
	{
		id: 'qwen/qwen3-next-80b-a3b-instruct',
		label: 'Qwen / Qwen3 Next 80B A3B Instruct',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['RAG', 'Tool use', 'High-throughput agent workflows'],
		notes: 'Fast stable instruct model. No thinking traces for cleaner production output. Great for RAG and multi-turn agentic workflows. Free tier available. $0.09/$1.10 per million tokens.'
	},
	{
		id: 'qwen/qwen3-next-80b-a3b-instruct:free',
		label: 'Qwen / Qwen3 Next 80B A3B Instruct (free)',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Free-tier agent workflows', 'RAG', 'Code'],
		notes: 'Free variant of Qwen3 Next 80B. Rate-limited.'
	},
	{
		id: 'qwen/qwen3-next-80b-a3b-thinking',
		label: 'Qwen / Qwen3 Next 80B A3B Thinking',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Math', 'Code synthesis', 'Logic and agentic planning'],
		notes: 'Thinking-only mode variant. Designed for hard multi-step problems. Stable under long chains of thought. $0.0975/$0.78 per million tokens.'
	},
	{
		id: 'qwen/qwen3-30b-a3b-thinking-2507',
		label: 'Qwen / Qwen3 30B A3B Thinking',
		contextWindow: '131K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Reasoning', 'Math', 'Competitive problem solving'],
		notes: 'Compact thinking-mode MoE. Strong on logic, math, science, coding. Good for agentic apps needing structured reasoning at low cost. $0.08/$0.40 per million tokens.'
	},
	{
		id: 'qwen/qwen3-30b-a3b-instruct-2507',
		label: 'Qwen / Qwen3 30B A3B Instruct',
		contextWindow: '262K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Instruction following', 'Multilingual', 'Tool use'],
		notes: 'Non-thinking instruct mode. Competitive on reasoning, coding, alignment benchmarks. $0.09/$0.30 per million tokens.'
	},
	{
		id: 'qwen/qwen-plus-2025-07-28',
		label: 'Qwen / Qwen Plus 0728',
		contextWindow: '1M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Balanced performance', 'General tasks', 'RAG'],
		notes: 'Qwen3-based hybrid reasoning model. Balanced speed, performance, and cost. 1M context. $0.26/$0.78 per million tokens.'
	},
	{
		id: 'qwen/qwen-plus-2025-07-28:thinking',
		label: 'Qwen / Qwen Plus 0728 (thinking)',
		contextWindow: '1M tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Complex reasoning',
			'Hard coding tasks',
			'Multi-step planning'
		],
		notes: 'Thinking variant of Qwen Plus 0728. Same model with reasoning traces enabled. $0.26/$0.78 per million tokens.'
	},

	// ════════════════════════════════════════════════════
	// QWEN3 Vision-Language Models
	// ════════════════════════════════════════════════════
	{
		id: 'qwen/qwen3-vl-235b-a22b-instruct',
		label: 'Qwen / Qwen3 VL 235B A22B',
		contextWindow: '262K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Document parsing', 'Visual QA', 'GUI automation'],
		notes: 'Largest open vision-language model. Strong on OCR, chart/table extraction, video understanding, and visual coding. $0.20/$0.88 per million tokens.'
	},
	{
		id: 'qwen/qwen3-vl-235b-a22b-thinking',
		label: 'Qwen / Qwen3 VL 235B A22B Thinking',
		contextWindow: '131K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Visual reasoning', 'STEM', 'Math over images'],
		notes: 'Thinking variant of the largest Qwen VL model. Optimized for multimodal reasoning in STEM and math. $0.26/$2.60 per million tokens.'
	},
	{
		id: 'qwen/qwen3-vl-32b-instruct',
		label: 'Qwen / Qwen3 VL 32B',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Document intelligence',
			'Spatial reasoning',
			'Visual tool use'
		],
		notes: '32B vision-language model. Fine-grained spatial reasoning, 32-language OCR, agentic interaction. $0.104/$0.416 per million tokens.'
	},
	{
		id: 'qwen/qwen3-vl-30b-a3b-instruct',
		label: 'Qwen / Qwen3 VL 30B A3B',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['GUI automation', 'Visual coding', 'Multimodal agents'],
		notes: 'MoE vision-language model. GUI automation, video timeline alignment, sketch-to-code. $0.13/$0.52 per million tokens.'
	},
	{
		id: 'qwen/qwen3-vl-8b-instruct',
		label: 'Qwen / Qwen3 VL 8B',
		contextWindow: '131K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Lightweight vision tasks', 'Document parsing', 'VQA'],
		notes: 'Small but capable vision-language model. 256K native context, extensible to 1M. 32-language OCR. $0.08/$0.50 per million tokens.'
	},

	// ─── X Grok ─────────────────────────────────────────────────────────────────
	// ════════════════════════════════════════════════════
	// xAI Grok — No free tiers. But insane value on Fast models.
	// ════════════════════════════════════════════════════

	// ── Grok 4.20 (Latest, March 2026) ───────────────────
	{
		id: 'x-ai/grok-4.20',
		label: 'xAI / Grok 4.20',
		contextWindow: '2M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Agentic tool calling', 'Coding', 'Precise reasoning'],
		notes: 'Latest xAI flagship. Lowest hallucination rate, strict prompt adherence. Optional reasoning on/off. 2M context. $2/$6 per million tokens.'
	},
	{
		id: 'x-ai/grok-4.20-multi-agent',
		label: 'xAI / Grok 4.20 Multi-Agent',
		contextWindow: '2M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Multi-agent workflows', 'Deep research', 'Parallel tool use'],
		notes: 'Multi-agent variant of Grok 4.20. Runs 4 agents (low/medium effort) or 16 agents (high/xhigh) in parallel for complex coordinated tasks. $2/$6 per million tokens.'
	},

	// ── Grok 4.1 (Nov 2025) ──────────────────────────────
	{
		id: 'x-ai/grok-4.1-fast',
		label: 'xAI / Grok 4.1 Fast',
		contextWindow: '2M tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Agentic tool calling', 'Customer support', 'Deep research'],
		notes: 'Best agentic tool calling model from xAI. 2M context. Optional reasoning. Cheapest frontier-class model at $0.20/$0.50 per million tokens — undercuts GPT-5 Mini, Gemini Flash, and all Claude models.'
	},

	// ── Grok 4 (Jul–Sep 2025) ────────────────────────────
	{
		id: 'x-ai/grok-4',
		label: 'xAI / Grok 4',
		contextWindow: '256K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Deep reasoning', 'Parallel tool calling', 'Multimodal tasks'],
		notes: 'Reasoning-always model. Parallel tool calling, structured outputs, image+text inputs. Reasoning cannot be disabled. Pricing increases past 128K tokens. $3/$15 per million tokens.'
	},
	{
		id: 'x-ai/grok-4-fast',
		label: 'xAI / Grok 4 Fast',
		contextWindow: '2M tokens',
		maxOutputTokens: '30K tokens',
		bestFor: ['Cost-efficient multimodal tasks', 'Reasoning', 'Agent flows'],
		notes: 'SOTA cost-efficiency with 2M context. Optional reasoning on/off. Multimodal. $0.20/$0.50 per million tokens.'
	},

	// ── Grok Code (Aug 2025) ─────────────────────────────
	{
		id: 'x-ai/grok-code-fast-1',
		label: 'xAI / Grok Code Fast 1',
		contextWindow: '256K tokens',
		maxOutputTokens: '32K tokens',
		bestFor: ['Agentic coding', 'Code workflows', 'Reasoning traces'],
		notes: 'Specialized coding reasoning model. Reasoning traces visible in response for steerability. Fast and economical. $0.20/$1.50 per million tokens.'
	},

	// ── Grok 3 (Apr–Jun 2025) ────────────────────────────
	{
		id: 'x-ai/grok-3',
		label: 'xAI / Grok 3',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Data extraction', 'Coding', 'Domain knowledge tasks'],
		notes: 'Flagship enterprise model. Deep domain knowledge in finance, healthcare, law, science. Strong on GPQA, LCB, MMLU-Pro. $3/$15 per million tokens.'
	},
	{
		id: 'x-ai/grok-3-mini',
		label: 'xAI / Grok 3 Mini',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Logic tasks', 'Math', 'Fast reasoning'],
		notes: 'Lightweight thinking model. Thinks before responding. Accessible reasoning traces. Great for logic and quantitative tasks. $0.30/$0.50 per million tokens.'
	},

	// ─── Nous Research ────────────────────────────────────────────────────────
	{
		id: 'nousresearch/hermes-3-llama-3.1-405b:free',
		label: 'Nous Research / Hermes 3 405B',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'General chat',
			'Instruction following',
			'Reasoning',
			'Roleplay'
		],
		notes: 'Generalist model fine-tuned on Llama 3.1 405B. Excellent instruction following.'
	},

	// ─── MiniMax ──────────────────────────────────────────────────────────────
	{
		id: 'minimax/minimax-m2.5:free',
		label: 'MiniMax / MiniMax M2.5',
		contextWindow: '197K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: [
			'Office productivity',
			'Document analysis',
			'Tool use',
			'Agents'
		],
		notes: 'Strong for office/productivity tasks. Large context window.'
	},

	// ─── Z.AI ─────────────────────────────────────────────────────────────────
	{
		id: 'z-ai/glm-4.5-air:free',
		label: 'Z.AI / GLM-4.5 Air',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['General chat', 'Tool use', 'Coding', 'Chinese language'],
		notes: 'From Zhipu AI. Strong multilingual model, especially Chinese. Tool use support.'
	},

	// ─── Arcee AI ─────────────────────────────────────────────────────────────
	{
		id: 'arcee-ai/trinity-large-preview:free',
		label: 'Arcee AI / Trinity Large',
		contextWindow: '131K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['General chat', 'Tool use', 'Enterprise tasks'],
		notes: 'Preview model from Arcee AI. Tool use support.'
	},

	// ─── LiquidAI ─────────────────────────────────────────────────────────────
	{
		id: 'liquid/lfm-2.5-1.2b-thinking:free',
		label: 'LiquidAI / LFM 2.5 1.2B (Thinking)',
		contextWindow: '33K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Reasoning', 'Small model tasks', 'Edge use cases'],
		notes: 'Tiny reasoning model from LiquidAI. Thinking mode enabled. Very fast.'
	},
	{
		id: 'liquid/lfm-2.5-1.2b-instruct:free',
		label: 'LiquidAI / LFM 2.5 1.2B',
		contextWindow: '33K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Fast responses', 'Simple tasks', 'Edge deployment'],
		notes: 'Tiny instruct model from LiquidAI. Extremely lightweight.'
	},

	// ─── Venice (Cognitive Computations) ─────────────────────────────────────
	{
		id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
		label: 'Venice / Dolphin Mistral 24B',
		contextWindow: '33K tokens',
		maxOutputTokens: '8K tokens',
		bestFor: ['Uncensored tasks', 'Creative writing', 'General chat'],
		notes: 'Dolphin fine-tune on Mistral 24B via Venice. Fewer content restrictions.'
	},

	// ─── OpenRouter Auto-Router ───────────────────────────────────────────────
	{
		id: 'openrouter/free',
		label: 'OpenRouter / Free Auto-Router',
		contextWindow: '200K tokens',
		maxOutputTokens: '16K tokens',
		bestFor: ['Trying free models', 'Prototyping', 'General tasks'],
		notes: 'Automatically routes to the best available free model for your request. Good starting point.'
	}
] as const satisfies ProviderModelMeta[]
