import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import Button from "../button/button";
import "./folder.css";

const Folder = () => {
  const { folder_name } = useParams();
  const { folders }: {folders: any} = useContext(FolderContext);
  const [buttons, setButtons] = useState([]);

  localStorage.removeItem("folderName");
  localStorage.setItem("folderName", folder_name as string);

  useEffect(() => {
    folders.forEach((folder: any) => {
      if (folder.name === folder_name) {
        setButtons(folder.buttons);
      }
    });
  }, []);

  return (
    <div className="buttons-container">
      {buttons.map((button: any, idx: number) => {
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