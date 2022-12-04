import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import { UserContext } from "../../contexts/user.context";
import { constructFolder } from "../../utils/constructor";

const NewFolder = () => {
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const { folders, addFolder } = useContext(FolderContext);
  const { currentUser } = useContext(UserContext);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setFolderName(value);
  }

  const saveFolder = () => {
    const newFolder = constructFolder(folderName, folders, currentUser);
    addFolder(folders, newFolder);
    navigate("/folders");
  }


  return (
    <div className="new-folder">
      <h3>Create a folder</h3>
      <form className="new-folder-form">
        <input 
          type="text" 
          onChange={handleChange}
          placeholder="Folder Name: "
          name='new-folder'
          value={folderName}
        />
        <button type="button" onClick={saveFolder}>Save Folder</button>
      </form>
    </div>
  )
}

export default NewFolder;