interface ReadFileInfo {
   path: string
   start_line: number
   end_line: number
}

export default function({ path, start_line, end_line }: ReadFileInfo) {
	clg('READ_FILE_TRIGGERED:', { path, start_line, end_line })
}
