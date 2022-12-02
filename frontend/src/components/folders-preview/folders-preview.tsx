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
        <div key={idx} className="folder-name-div">
          <Link to={folder.name}>
            <h3>
              {folder.name.toUpperCase()}
            </h3> 
          </Link>
        </div>
        )
      })}
    </div>
  )
}

export default FoldersPreview;