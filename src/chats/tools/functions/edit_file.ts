interface EditFileInfo {
   path: string
	lines: {
		line: number,
		text: string,
	}[]
}

export default function({ path, lines }: EditFileInfo) {
	clg('EDIT_FILE_TRIGGERED:', { path, lines })
}
