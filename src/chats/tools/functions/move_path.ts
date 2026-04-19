import { MoveFileInfo } from "./types";
import { getRelativePath } from "./utils";

export default async function* ({ path, new_path }: MoveFileInfo) {

	// --- SEND SIGNAL TO PANEL THAT FILE IS BEING READ ---
	const relativePath = getRelativePath(path)
	const relativeNewPath = getRelativePath(new_path)

	const toolCalling = JSON.stringify({
		header: `MOVED: ${relativePath} -> ${relativeNewPath}`
	})
	const toSave = `<display_ui>${toolCalling}</display_ui>`

	// --- START FILE READ ---
	const fs = acode.require('fs')

	const exists = await fs(path)?.exists()

	if (!exists) {
		throw new Error('Specified path does not exist.')
	}

	const result = await fs(path).moveTo(new_path)

	yield { result, toSave }
}
