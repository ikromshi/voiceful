import "./folders-preview.css";
import { FolderContext } from "../../contexts/folder.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const FoldersPreview = () => {
  const state = useContext(FolderContext);
  const folders: any = state.folders;

  return (
    <div className="folders-preview">
      {folders?.map((folder: any, idx: number) => {
        return (
        <Link key={idx} to={folder.name}>
          <div className="folder-name-container">
            <div className="folder-name">
              {folder.name.toUpperCase()}
            </div>
          </div>
        </Link>
        )
      })}
      <Link to="/new-folder">
        <div className="add-folder">
            <div className="add-folder-plus">&#43;</div>
        </div>
      </Link> 
    </div>
  )
}

export default FoldersPreview;