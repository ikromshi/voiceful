import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="folder">
      {buttons.map((button: any, idx: number) => {
        return <h3 key={idx}>{button.name.toUpperCase()}</h3>
      })}
    </div>
  )
}

export default Folder;