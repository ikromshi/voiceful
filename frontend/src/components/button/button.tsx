import { speak } from "../text-reader/text-reader";
import "./button.css";
import { ReactComponent as Pencil } from "../../assets/trash.svg";
import { ReactComponent as Volume } from "../../assets/volume2.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import { FolderContext } from "../../contexts/folder.context";
import { ButtonType } from "../../types/types";

const Button = ({button}: {button: ButtonType} ) => {
  const { currentUser } = useContext(UserContext);
  const { deleteButton } = useContext(FolderContext);

  // not an array exception
  const handleDelete = async () => {
    const foldersJson = localStorage.getItem("folders") as string;
    // supposed to return an array;
    const folders = JSON.parse(foldersJson);
    deleteButton(folders, button.id);
    await axios({method: "POST", url: "http://127.0.0.1:5000/delete_buttons", data: {button_id: button.id}});
  }

  return (
    <div className="button">
      <div onClick={() => speak(null, button.name)} className="button-speak">
        <Volume />
      </div>
      <div className="button-name">{button.name.toUpperCase()}</div>
      <div className="button-edit">
        {currentUser && <Pencil />}
      </div>
    </div>
  )
}

export default Button;