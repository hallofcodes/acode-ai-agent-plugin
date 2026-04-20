import { NEW_LINE_TEXT } from "../../configs/constants";

export const tools = [
	{
		type: 'function',
		function: {
			name: 'read_file',
			description:
				'Read a file from the project. Returns the content of the file as a string.',
			parameters: {
				type: 'object',
				required: ['uri', 'start_line', 'end_line'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file'
					},
					start_line: {
						type: 'number',
						description: 'The starting line number'
					},
					end_line: {
						type: 'number',
						description: 'The ending line number'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'list_dir',
			description: 'List all files in a directory.',
			parameters: {
				type: 'object',
				required: ['uri'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the directory'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'edit_file',
			description: 'Edit a file in the project.',
			parameters: {
				type: 'object',
				required: ['uri', 'lines'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file'
					},
					lines: {
						type: 'array',
						items: {
							type: 'object',
							required: ['line', 'text'],
							properties: {
								line: {
									type: 'number',
									description: 'The line number to edit'
								},
								text: {
									type: 'string',
									description:
										`The new text for the line, empty string would delete this line, using ${NEW_LINE_TEXT} would insert a new line after this line, both deleting line & insertion of new line would readjust the target file lines as we all know, so the next object line value in the lines array should depend on how the current edit was made. when just only replacing the current line, then nothing will get adjusted`
								}
							}
						},
						description: 'The new lines for the file'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'rename_path',
			description: 'Rename a file/directory in the project.',
			parameters: {
				type: 'object',
				required: ['uri', 'new_name'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file/directory'
					},
					new_name: {
						type: 'string',
						description: 'The new name (not uri) for the file/directory'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'move_path',
			description: 'Move a file/directory in the project.',
			parameters: {
				type: 'object',
				required: ['uri', 'new_uri'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file/directory'
					},
					new_uri: {
						type: 'string',
						description: 'The new full uri for the file/directory'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'create_file',
			description: 'Create a new file in the project.',
			parameters: {
				type: 'object',
				required: ['uri'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file'
					},
					content: {
						type: 'string',
						description:
							'The optional content to write in the new file, can be empty'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'create_dir',
			description: 'Create a new directory in the project.',
			parameters: {
				type: 'object',
				required: ['uri'],
				properties: {
					uri: {
						type: 'string',
						description:
							'The full uri to the directory, parent folders must exist'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'delete_path',
			description: 'Delete a file/directory.',
			parameters: {
				type: 'object',
				required: ['uri'],
				properties: {
					uri: {
						type: 'string',
						description: 'The full uri to the file or directory'
					}
				}
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'edited_files_history',
			description:
				'Here you can access and retrieve every bit of edits made (using the edit_file tool) in every files.',
			parameters: {
				type: 'object',
				properties: {
					filterByIds: {
						type: 'array',
						items: {
							type: 'string'
						},
						description:
							'Get theses exact ID history, exactly the array length you passed that will be returned with the exact edit history id, and each ID may be from different files.'
					},
					filterByFile: {
						type: 'string',
						description:
							"It takes full uri. It will retrieve all edited histories of the file. when using 'filterByFile' you should set the 'limit' property."
					},
					limit: {
						type: 'number',
						description:
							'Limit the length of edits to get on a particular file.'
					}
				}
			}
		}
	}
]
