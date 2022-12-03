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