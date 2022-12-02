import { Route, Routes } from "react-router-dom"
import Folder from "../../components/folder/folder"
import FoldersPreview from "../../components/folders-preview/folders-preview"

const Folders = () => {
  return (
    <Routes>
      <Route index element={<FoldersPreview />}/>
      <Route path=":folder_name" element={<Folder />} />
    </Routes>
  )
}

export default Folders;