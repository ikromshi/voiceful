import { FolderContext } from "../../contexts/folder.context";
import { useContext } from "react";
import "./buttons-preview.css";
import Button from "../button/button";

const ButtonsPreview = () => {
  const state = useContext(FolderContext);
  const folders: any = state.folders;

  return (
    <div className="buttons-preview">
      {folders && folders.map((folder: any, idx: number) => <Button key={idx} buttons={folder.buttons}/>)}
    </div>
  )
}

export default ButtonsPreview;