export interface ReadFileInfo {
	uri: string
	start_line: number
	end_line: number
}

export interface ListDirInfo {
	uri: string
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
	uri: string
	lines: EditFileLines[]
}

export interface RenameFileInfo {
	uri: string
	new_name: string
}

export interface MoveFileInfo {
	uri: string
	new_uri: string
}

export interface CreateFileInfo {
	uri: string
	content: string
}

export interface CreateDirInfo {
	uri: string
}

export interface EditedFilesHistoryProps {
	filterByIds?: string[]
	filterByFile?: string
	limit?: number
}

export type ToolsReturnType = {
	toSave?: string
	result?: string
}

export type ToolsFunction = (
	args:
		| ReadFileInfo
		| ListDirInfo
		| RenameFileInfo
		| MoveFileInfo
		| EditFileInfo
		| CreateFileInfo
		| CreateDirInfo
		| EditedFilesHistoryProps
) => AsyncGenerator<ToolsReturnType>

export type DisplayToolsCallUsed =
	| { header: string }
	| {
		path: string
		editedFileHistoryId: string
		totalAdded: number
		totalRemoved: number
	}
