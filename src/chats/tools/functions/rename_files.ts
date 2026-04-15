interface RenameFileInfo {
   path: string
   new_path: string
}

export default function({ path, new_path }: RenameFileInfo) {
	clg('RENAME_FILE_TRIGGERED:', { path, new_path })
}
