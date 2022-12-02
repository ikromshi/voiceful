import { FormEvent, useContext, useState } from "react";
import { FolderContext } from "../../contexts/folder.context";
import { UserContext } from "../../contexts/user.context";

const NewFolder = () => {
  const [ newFolder, setNewFolder] = useState({id: null, name: "", user_id: null, buttons: []});
  const [folderName, setFolderName] = useState("");
  
  const { folders, addFolder } = useContext(FolderContext);
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setFolderName(value);
  }

  const saveFolder = () => {
    addFolder(folders, folderName);
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
        <button onClick={saveFolder}>Save Folder</button>
      </form>
    </div>
  )
}

export default NewFolder;