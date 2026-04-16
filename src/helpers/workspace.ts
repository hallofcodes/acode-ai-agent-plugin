import { ContextFile } from "../panel/types"

export const getWorkspaceFolders = () =>
   window.addedFolder?.map(folder => folder.url)

export const getActiveFiles = () => {
   const workspaceFolders = getWorkspaceFolders()

   return window.editorManager?.files
      .map((file: Acode.EditorFile): ContextFile | null => {
         const newFile: ContextFile = {
            id: file.id,
            filename: file.filename,
            previewName: file.filename,
            previewUri: file.filename,
            location: file.location,
            uri: file.uri
         }

         // --- Firstly check if the active file is under the workspace, then use relative path for filename ---
         for (const folder of workspaceFolders) {
            if (file.location?.startsWith(folder)) {
               const shortLocation = file.location
                  .slice(folder.length)
                  .replace(/^\/+|\/+$/g, '')

               newFile.previewName = file.filename + ' /' + shortLocation
               newFile.previewUri =
                  (shortLocation == '' ? '' : shortLocation + '/') +
                  file.filename
            }
         }

         return newFile.location ? newFile : null
      })
      .filter(item => item != null)
}
