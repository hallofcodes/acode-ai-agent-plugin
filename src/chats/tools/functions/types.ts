export interface ReadFileInfo {
	path: string
	start_line: number
	end_line: number
}

export interface ListDirInfo {
	path: string
}

export interface EditFileLines {
	line: number
	text: string
}

export interface OldEditedFileLines {
	line: number
	text: string
	isAdded: boolean
	revertable?: boolean
}

export interface EditFileInfo {
	path: string
	lines: EditFileLines[]
}

export interface RenameFileInfo {
	path: string
	new_path: string
}

export type ToolsReturnType = {
   toSave?: string
	result?: string
}

export type ToolsFunction = (
	args: ReadFileInfo | ListDirInfo
) => AsyncGenerator<ToolsReturnType>
