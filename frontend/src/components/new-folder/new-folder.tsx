import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import { UserContext } from "../../contexts/user.context";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import { constructFolder } from "../../utils/constructor";
import FormInput from "../form-input/form-input";
import "./new-folder.css";

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
      <form className="new-folder-form">
        <FormInput
          label="Folder Name" 
          type="text" 
          onChange={handleChange}
          name='new-folder'
          value={folderName}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={saveFolder}>Save Folder</Button>
      </form>
    </div>
  )
}

export default NewFolder;