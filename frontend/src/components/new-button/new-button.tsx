import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input";
import { FolderContext } from "../../contexts/folder.context";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import { constructButton } from "../../utils/constructor";
import "./new-button.css";
import axios from "axios";

const NewButton = () => {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState("");
  const { folders } = useContext(FolderContext);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setButtonName(value);
  }

  const saveButton = async () => {
    const newButton = constructButton(buttonName, folders);
    await saveButtonsInDB(buttonName, newButton.folder_id);
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

const saveButtonsInDB = async (buttonName: string, folderId: number) => {
  axios({method: "POST", url: "http://127.0.0.1:5000/buttons", data: {folder: folderId, button: buttonName}})
    .then((response) => {
    }
    ).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
  });
}

export default NewButton;