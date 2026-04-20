# 🤖 Rutex: The Autonomous AI Agent for Acode

## 🚀 Bringing Desktop-Class Automation to Android

Rutex is a high-performance, autonomous AI agent plugin built specifically for the Acode mobile editor. It transforms Acode from a simple text editor into a fully agentic IDE, allowing LLMs to perceive, analyze, and manipulate your codebase in real-time.

### 🛠️ Core Capabilities

-  **📁 File System Mastery**: Direct ability to read, create, edit, rename, and delete files and directories.
-  **⚙️ Agentic Loop**: Executes tasks in a chain (Read → Analyze → Edit → Verify) without requiring constant user prompts.
-  **💻 Terminal Integration**: Bridges the gap between the editor and the shell for seamless build and deployment workflows.
-  **⚡ Context-Aware**: Maintains deep project context to handle complex refactoring and multi-file updates.

### 📸 Screenshots

![Rutex Interface 1](https://raw.githubusercontent.com/dconco/acode-ai-agent-plugin/main/screenshots/1.png)
![Rutex Interface 2](https://raw.githubusercontent.com/dconco/acode-ai-agent-plugin/main/screenshots/2.png)

### 🔌 Supported Providers

Rutex currently supports the following AI providers, with more coming soon:

-  **Gemini**: High-performance multimodal capabilities.
-  **OpenRouter**: Access to a vast array of top-tier LLMs.
-  **Ollama**: Local LLM execution. (_Note: Connecting directly to ollama.com may cause CORS issues; please use a CORS-proxy URL that redirects to your Ollama instance_).
-  **OpenAI**: Industry-leading models including GPT-4 and GPT-3.5.

-  **📝 Intelligent Diff Engine**: Instead of overwriting files, Rutex uses a precise line-based edit system. It calculates line shifts in real-time to perform surgical updates, ensuring no accidental data loss and maximizing token efficiency.

Built with **TypeScript** and **Webpack**, Rutex utilizes a secure tool-calling protocol to interact with the Acode API, ensuring that every file modification is precise and traceable.

---

**Created by [Dave Conco (dconco)](https://github.com/dconco) & the [Hall Of Codes](https://github.com/hallofcodes) Team**

An autonomous AI agent plugin for Acode that enables LLMs to directly read, create, and refactor files, while executing terminal commands through a secure agentic loop — bringing desktop-class AI automation to Android.

> By [Dave Conco (dconco)](https://github.com/dconco) with [Hall Of Codes](https://github.com/hallofcodes) Team

### 🤝 Support & Contribute

Rutex is an open-source project. If you find this tool useful and want to support my work, you can do so here:
- ☕ [Buy Me a Coffee](https://www.buymeacoffee.com/dconco)
- 🌟 [GitHub Sponsors](https://github.com/sponsors/dconco)

**Want to help build the future of mobile coding?** 
We welcome contributors! Feel free to open an issue or submit a pull request to help us improve Rutex.
