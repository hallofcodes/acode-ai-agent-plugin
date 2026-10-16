# Changelog

## v0.0.10

- Fixed Ollama models that reply with raw tool-call JSON in the message text instead of running the tool. The agent now detects and dispatches these calls, so local models like qwen and smaller llama variants work.

- Added API key fields for every provider directly in the chat settings panel, with a clear message and a one tap Settings button when a key is missing.

- Fixed Ollama streaming so responses are preserved when network chunks split a JSON record across boundaries.

- Stopped Ollama from running queued tool calls after the request is cancelled.

- Allowed Ollama streaming to work when no abort signal is supplied.

- Changed the default Ollama host to the local http://127.0.0.1:11434.

## v0.0.9

- Allowed AI to access files starting with "contents://" as well as "file:///"

## v0.0.8

- Added custom host and custom model support for OpenAI.

## v0.0.7

- Changed the re-order of history list, conversation history now shows latest conversation first.

- Fix the 'undefined replace function' error that shows when the AI tries editing file.
