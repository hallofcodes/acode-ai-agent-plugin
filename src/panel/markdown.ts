import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("bash", bash as any);
hljs.registerLanguage("sh", bash as any);
hljs.registerLanguage("shell", bash as any);
hljs.registerLanguage("css", css as any);
hljs.registerLanguage("js", javascript as any);
hljs.registerLanguage("javascript", javascript as any);
hljs.registerLanguage("json", json as any);
hljs.registerLanguage("md", markdown as any);
hljs.registerLanguage("markdown", markdown as any);
hljs.registerLanguage("php", php as any);
hljs.registerLanguage("py", python as any);
hljs.registerLanguage("python", python as any);
hljs.registerLanguage("ts", typescript as any);
hljs.registerLanguage("typescript", typescript as any);
hljs.registerLanguage("html", xml as any);
hljs.registerLanguage("xml", xml as any);

export const renderMarkdown = (raw: string): string => {
   let h = raw.replace(
      /```(\w*)\n?([\s\S]*?)```/g,
      (_, lang: string, code: string) => {
         const language = lang || "code";
         const encoded = btoa(unescape(encodeURIComponent(code.trimEnd())));

         const highlighted = hljs.highlight(code.trimEnd(), { language }).value;

         return `
			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">${language}</span>
					<button class="code-btn copy-code-btn" data-enc="${encoded}">
						<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>copy
					</button>
				</div>
				<div class="code-body">${highlighted}</div>
			</div>`;
      },
   );

   h = h.replace(/^### (.+)$/gm, "<h3>$1</h3>");
   h = h.replace(/^## (.+)$/gm, "<h2>$1</h2>");
   h = h.replace(/^# (.+)$/gm, "<h1>$1</h1>");

   h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
   h = h.replace(/\*(.+?)\*/g, "<em>$1</em>");
   h = h.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

   h = h.replace(/((?:^[-*] .+(?:\n|$))+)/gm, (block) => {
      const items = block
         .trim()
         .split("\n")
         .map((line: string) => `<li>${line.replace(/^[-*] /, "")}</li>`)
         .join("");
      return `<ul>${items}</ul>`;
   });

   h = h.replace(/((?:^\d+\. .+(?:\n|$))+)/gm, (block) => {
      const items = block
         .trim()
         .split("\n")
         .map((line: string) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
         .join("");
      return `<ol>${items}</ol>`;
   });

   h = h.replace(/`([^`\n]+)`/g, "<code>$1</code>");
   h = h.replace(/\n{2,}/g, "</p><p>");
   h = h.replace(/\n/g, "<br>");
   h = `<p>${h}</p>`;

   h = h.replace(/<p>(<(?:div|ul|ol|h[1-3]|blockquote))/g, "$1");
   h = h.replace(/((?:div|ul|ol|h[1-3]|blockquote)>)<\/p>/g, "$1");
   h = h.replace(
      /<p>\s*(<div class="code-block">[\s\S]*?<\/div>)\s*<\/p>/g,
      "$1",
   );
   h = h.replace(/<br>\s*(<div class="code-block">)/g, "$1");
   h = h.replace(/(<\/div>)\s*<br>/g, "$1");

   return h;
};

export type EditedFileLines = Array<{
   line: number;
   text: string;
   isAdded: boolean;
}>;

export const renderEditedFileLines = (
   lines: EditedFileLines,
   escapeHtml: (value: string) => string,
   editedFilePath = "",
): string => {
   const entries = lines.sort((a, b) => a.line - b.line);

   const rows = entries
      .map((entry) =>
         [
            `<div class="edited-line ${entry.isAdded ? "added" : "removed"}">`,
            `<span class="edited-line-number">${entry.line}</span>`,
            `<span class="edited-line-prefix">${entry.isAdded ? "+" : "-"}</span>`,
            `<span class="edited-line-text">${hljs.highlightAuto(entry.text).value}</span>`,
            "</div>",
         ].join(""),
      )
      .join("");

   return [
      '<div class="code-block edited-lines-block">',
      `<div class="code-header edited-h"><span class="code-lang edited">EDITED: ${escapeHtml(editedFilePath || "edited lines")}</span></div>`,
      `<div class="code-body edited-lines-body">${rows}</div>`,
      "</div>",
   ].join("");
};
