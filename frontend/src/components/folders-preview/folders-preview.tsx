import "./folders-preview.css";
import { FolderContext } from "../../contexts/folder.context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFoldersFromAPI } from "../home/home";
import { UserContext } from "../../contexts/user.context";

const FoldersPreview = () => {
  const state = useContext(FolderContext);
  const folders: any = state.folders;
  const { currentUser } = useContext(UserContext);
  const { setFolders } = useContext(FolderContext);

  useEffect(() => {
    const fetchFolders = async () => {
      await fetchFoldersFromAPI("http://127.0.0.1:5000/get_folders", currentUser, "POST", setFolders);
    };

    fetchFolders();

  }, []);

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