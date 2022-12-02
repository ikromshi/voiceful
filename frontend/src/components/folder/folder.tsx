import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import "./folder.css";

const Folder = () => {
  const { folder_name } = useParams();
  const { folders }: {folders: any} = useContext(FolderContext);
  const [buttons, setButtons] = useState([]);
  console.log(buttons);

  useEffect(() => {
    folders.forEach((folder: any, idx: number) => {
      if (folder.name === folder_name) {
        setButtons(folder.buttons);
      }
    });
  }, []);

  return (
    <div className="folder-container">
      {buttons.map((button: any, idx: number) => {
        return <div key={idx} className="folder">
                <div className="folder-name" >{button.name.toUpperCase()}</div>
              </div>
      })}
      <div className="add-button">
        <Link to="new-file">
          <div className="add-button-plus">&#43;</div>
        </Link> 
      </div>
    </div>
  )
}

export default Folder;