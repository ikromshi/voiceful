import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import { UserContext } from "../../contexts/user.context";
import { ButtonType, FolderType } from "../../types/types";
import Button from "../button/button";
import { fetchFoldersFromAPI } from "../home/home";
import "./folder.css";

const Folder = () => {
  const { folder_name } = useParams();
  const { folders, setFolders }: {folders: null | Array<FolderType>, setFolders: (folders: Array<FolderType>) => void} = useContext(FolderContext);
  const { currentUser } = useContext(UserContext);
  const [buttons, setButtons] = useState([]);
  let currentFolder: FolderType = {
    id: 0,
    name: "",
    user_id: 0,
    buttons: []
  };
  folders?.forEach((folder, idx) => {
    if (folder.name === folder_name) {
      currentFolder = folder;
    } 
  });

  localStorage.removeItem("folderName");
  localStorage.setItem("folderName", folder_name as string);

  useEffect(() => {
    const fetchFolders = async () => {
      await fetchFoldersFromAPI("http://127.0.0.1:5000/get_folders", currentUser, "POST", setFolders);
    };
    fetchFolders();
    folders?.forEach((folder: any) => {
      if (folder.name === folder_name) {
        setButtons(folder.buttons);
      }
    });
  }, [currentFolder.buttons.length]);

  return (
    <div className="buttons-container">
      {buttons.map((button: ButtonType, idx: number) => {
        return <Button key={idx} button={button}/>
      })}
      <Link to="/new-button">
        <div className="add-button">
            <div className="add-button-plus">&#43;</div>
        </div>
      </Link> 
    </div>
  )
}

export default Folder;