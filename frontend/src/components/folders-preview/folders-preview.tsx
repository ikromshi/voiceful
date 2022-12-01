import "./folders-preview.css";
import { FolderContext } from "../../contexts/folder.context";
import { useContext } from "react";

const FoldersPreview = () => {
  const state = useContext(FolderContext);
  const folders: any = state.folders;

  return (
    <div className="folders-preview">
      {folders && folders.map((folder: any) => <h3 key={folder.id}>{folder.name}</h3>
      )}
    </div>
  )
}

export default FoldersPreview;