import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../contexts/folder.context";
import { constructButton } from "../utils/constructor";

const NewButton = () => {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState("");
  const { folders, addButton} = useContext(FolderContext);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setButtonName(value);
  }

  const saveButton = () => {
    const newButton = constructButton(buttonName, folders);
    addButton(folders, newButton);
    navigate(`/folders/${localStorage.getItem("folderName")}`);
  }

  return (
    <div className="new-button">
      <h3>Create a button</h3>
      <form className="new-button-form">
        <input 
          type="text" 
          onChange={handleChange}
          placeholder="Button Name: "
          name='new-button'
          value={buttonName}
        />
        <button type="button" onClick={saveButton}>Save Button</button>
      </form>
    </div>
  )
}

export default NewButton;