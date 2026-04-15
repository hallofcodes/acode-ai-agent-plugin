interface ListFilesInfo {
   path: string
}

export default function({ path }: ListFilesInfo) {
	clg('LIST_FILES_TRIGGERED:', { path })
}
