import { UserType } from "../types/types";

export const constructFolder = (folderName: string, folders: any, currentUser: UserType) => {  
  const newFolderId = folders.length && folders[folders.length-1]["id"] + 1;
  
  const newFolder = {
    id: newFolderId,
    user_id: currentUser!.id,
    name: folderName,
    buttons: []
  };
  return newFolder;
}

export const constructButton = (buttonName: string, folders: any) => {
  const folderName = localStorage.getItem("folderName");
  let folderOfButton: any = null;
  let buttonID = 0;

  for (const folder of folders) {
    if (folder.name === folderName) {
      folderOfButton = folder;
    };
  }

  if (folderOfButton.buttons.length) {
    buttonID = folderOfButton.buttons[folderOfButton.buttons.length-1].id+1;
  }

  const newButton = folderOfButton && {
    id: buttonID,
    name: buttonName,
    folder_id: folderOfButton.id
  }

  return newButton;
}