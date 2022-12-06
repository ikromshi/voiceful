import { FolderContext } from "../../contexts/folder.context";
import { useContext } from "react";
import "./buttons-preview.css";
import Button from "../button/button";
import { ButtonType, FolderType } from "../../types/types";

const ButtonsPreview = () => {
  const state = useContext(FolderContext);
  const folders: Array<FolderType> = state.folders!;

  return (
    <div className="buttons-preview">
      {folders && folders.map((folder: FolderType) => {
        return folder.buttons.map((button: ButtonType, idx: number) => {
          return <Button key={idx} button={button} />
        })
      })}
    </div>
  )
}

export default ButtonsPreview;