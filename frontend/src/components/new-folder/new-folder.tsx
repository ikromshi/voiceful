import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import FormInput from "../form-input/form-input";
import "./new-folder.css";

const NewFolder = () => {
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setFolderName(value);
  }

  const saveFolder = async () => {
    /// redirect issue;
    await saveFoldersInDB(folderName, currentUser!.email);
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

const saveFoldersInDB = async (folderName: string, email: string) => {
  await axios({method: "POST", url: "http://127.0.0.1:5000/put_folders", data: {folder: folderName, email: email}})
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


export default NewFolder;