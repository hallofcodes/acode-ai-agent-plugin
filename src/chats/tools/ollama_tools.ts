export const tools = [
   {
      type: "function",
      function: {
         name: "read_file",
         description:
            "Read a file from the project. Returns the content of the file as a string.",
         parameters: {
            type: "object",
            required: ["path", "start_line", "end_line"],
            properties: {
               path: {
                  type: "string",
                  description: "The absolute path to the file",
               },
               start_line: {
                  type: "number",
                  description: "The starting line number",
               },
               end_line: {
                  type: "number",
                  description: "The ending line number",
               },
            },
         },
      },
   },
   {
      type: "function",
      function: {
         name: "list_files",
         description: "List all files in a directory.",
         parameters: {
            type: "object",
            required: ["path"],
            properties: {
               path: {
                  type: "string",
                  description: "The absolute path to the directory",
               },
            },
         },
      },
   },
   {
      type: "function",
      function: {
         name: "edit_file",
         description: "Edit a file in the project.",
         parameters: {
            type: "object",
            required: ["path", "lines"],
            properties: {
               path: {
                  type: "string",
                  description: "The absolute path to the file",
               },
               lines: {
                  type: "array",
                  items: {
                     type: "object",
                     required: ["line", "text"],
                     properties: {
                        line: {
                           type: "number",
                           description: "The line number to edit",
                        },
                        text: {
                           type: "string",
                           description:
                              "The new text for the line, empty string would delete this line, using \\n would insert a new line after this line, both deleting line & insertion of new line would readjust the target file lines as we all know, so the next object line value in the lines array should depend on how the current edit was made. when just only replacing the current line, then nothing will get adjusted",
                        },
                     },
                  },
                  description: "The new lines for the file",
               },
            },
         },
      },
   },
   {
      type: "function",
      function: {
         name: "rename_file",
         description: "Rename/move a file in the project.",
         parameters: {
            type: "object",
            required: ["path", "new_path"],
            properties: {
               path: {
                  type: "string",
                  description: "The absolute path to the file",
               },
               new_path: {
                  type: "string",
                  description: "The new absolute path for the file",
               },
            },
         },
      },
   },
];
