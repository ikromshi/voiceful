import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/form-input/form-input";
import { FolderContext } from "../contexts/folder.context";
import Button, { BUTTON_TYPE_CLASSES } from "../styled-components/button-standard/button.component";
import { constructButton } from "../utils/constructor";
import "./new-button.css";

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
      <form className="new-button-form">
        <FormInput 
          type="text" 
          onChange={handleChange}
          label="Button Name: "
          name='new-button'
          value={buttonName}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={saveButton}>Save Button</Button>
      </form>
    </div>
  )
}

export default NewButton;