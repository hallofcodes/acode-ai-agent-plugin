import {
   PluginSettings,
   setPluginSetting,
   getPluginSettings,
   loadSavedKeys,
} from "./helpers/pluginSettings";
import { addIcon, removeIcon } from "./sidebar";
import {
   PLUGIN_ID,
   AI_SETTINGS_STORAGE_KEY,
   LAST_ACTIVE_CHAT_HISTORY_KEY,
	CHAT_HISTORY_PREFIX,
} from "./configs/constants";
import { aiSettings, loadAiSettingsFromLocalStorage } from "./chats/settings";
import { Provider } from "./chats/types";
import { deleteAllChatHistory } from "./chats/history/chatHistory";

function clg(...messages: unknown[]) {
	let newMsg = ''

	messages.forEach(msg => {
		if (typeof msg === 'object') {
			newMsg += JSON.stringify(msg, null, 2) + ' '
		} else {
			newMsg += String(msg) + ' '
		}
	});

	alert(newMsg.trim())
}
window.clg = clg;

class MainPlugin {
   static baseUrl: string = "";

   async init() {
      loadSavedKeys();
      loadAiSettingsFromLocalStorage();
      addIcon();
   }

   async destroy() {
      removeIcon();
      await deleteAllChatHistory();

      localStorage.removeItem("draft-message");
      localStorage.removeItem(AI_SETTINGS_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTIVE_CHAT_HISTORY_KEY);
		localStorage.removeItem(CHAT_HISTORY_PREFIX)
   }
}

if (window.acode) {
   const saved = getPluginSettings();
   const myPlugin = new MainPlugin();

   const formatSecret = (secret: unknown): string =>
      "•".repeat(String(secret || "").length);

   acode.setPluginInit(
      PLUGIN_ID,
      async (
         baseUrl: string,
         $page: Acode.WCPage,
         options: Acode.PluginInitOptions,
      ) => {
         const { cacheFile, cacheFileUrl } = options;

         if (!baseUrl.endsWith("/")) {
            baseUrl += "/";
         }

         MainPlugin.baseUrl = baseUrl;
         await myPlugin.init();
      },
      {
         list: [
            {
               key: "gemini",
               text: "Gemini API Key",
               prompt: "Enter your Gemini API Key",
               promptType: "text",
               value: formatSecret(saved.gemini),
            },
            {
               key: "claude",
               text: "Claude API Key",
               prompt: "Enter your Claude API Key",
               promptType: "text",
               value: formatSecret(saved.claude),
            },
            {
               key: "deepseek",
               text: "DeepSeek API Key",
               prompt: "Enter your DeepSeek API Key",
               promptType: "text",
               value: formatSecret(saved.deepseek),
            },
            {
               key: "openai",
               text: "OpenAI API Key",
               prompt: "Enter your OpenAI API Key",
               promptType: "text",
               value: formatSecret(saved.openai),
            },
            {
               key: "ollama",
               text: "Ollama API Key (Optional)",
               prompt: "Enter your Ollama API Key (Optional, if you set it)",
               promptType: "text",
               value: formatSecret(saved.ollama),
            },
            {
               key: "openrouter",
               text: "OpenRouter API Key",
               prompt: "Enter your OpenRouter API Key",
               promptType: "text",
               value: formatSecret(saved.openrouter),
            },
         ],
         cb: (key: string, value: unknown) => {
            setPluginSetting(key as keyof PluginSettings, String(value));
            aiSettings.apiKeys[key as Provider] = String(value);
         },
      },
   );

   acode.setPluginUnmount(PLUGIN_ID, () => {
      myPlugin.destroy();
   });
}
