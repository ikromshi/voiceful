import { createContext, ReactElement, useReducer } from "react";
import { FOLDER_ACTION_TYPES } from "../utils/actionTypes";

export const FolderContext = createContext({
  folders: null,
  setFolders: (folders: any) => {},
  unsetFolders: () => {},
  addFolder: (folders: any, folder: any) => {},
  deleteFolder: (folders: any, folderName: string) => {},
  addButton: (folders: any, folderID: number, button: any) => {},
  deleteButton: (folders: any, buttonName: string) => {}
});

export const FolderReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type){
    case FOLDER_ACTION_TYPES.SET_FOLDERS:
      return {...state, folders: payload};
    case FOLDER_ACTION_TYPES.UNSET_FOLDERS:
      return {...state, folders: null};
    case FOLDER_ACTION_TYPES.ADD_FOLDER:
      return {...state, folders: payload};
    default:
      throw new Error(`Unhandled type ${type} in FolderReducer`)
  }
}

const INITIAL_STATE = {
  folders: null
};

export const FolderProvider = ({ children } : {children: ReactElement}) => {
  const [ state, dispatch ] = useReducer(FolderReducer, INITIAL_STATE);

  const setFolders = (folders: any) => {
    localStorage.setItem("folders", JSON.stringify(folders));
    dispatch({ type: FOLDER_ACTION_TYPES.SET_FOLDERS, payload: folders });
  };

  const unsetFolders = () => {
    localStorage.removeItem("folders");
    dispatch({ type: FOLDER_ACTION_TYPES.UNSET_FOLDERS, payload: null });
  }

  // need to construc a full folder before calling this method;
  const addFolder = (folders: any, folder: any) => {
    folders.push(folder);
    localStorage.setItem("folders", JSON.stringify(folders));
    dispatch(({ type: FOLDER_ACTION_TYPES.ADD_FOLDER, payload: folders }));
  }

  const deleteFolder = (folders: any, folderName: string) => {
    const newFolders = removeFolder(folders, folderName);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.DELETE_FOLDER, payload: newFolders });
  }

  // need to provide a folder ID to add a button to the folder; need to construct a full button before calling this method;
  const addButton = (folders: any, folderID: number, button: any) => {
    const newFolders = addButtonToFolder(folders, folderID, button);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.ADD_BUTTON, payload: newFolders });
  }

  const deleteButton = (folders: any, buttonName: string) => {
    const newFolders = removeButtonFromFolder(folders, buttonName);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.DELETE_BUTTON, payload: newFolders });
  }

  const foldersInState = state.folders;
  const foldersJson = localStorage.getItem("folders");
  const folders = foldersJson !== null ? JSON.parse(foldersJson) : foldersInState;

  const value = {folders, setFolders, unsetFolders, addFolder, deleteFolder, addButton, deleteButton};

  return <FolderContext.Provider value={value}>{ children }</FolderContext.Provider>
}


function removeFolder(folders: any, folderName: string) {
  const newFolders: any[] = [];

  folders.forEach((folder: any) => {
    if (folder.name !== folderName) {
      newFolders.push(folder);
    }
  });
  return newFolders;
}

function addButtonToFolder(folders: any, folderID: number, button: any) {
  const newFolders: any[] = [];

  folders.forEach((folder: any) => {
    if (folder.id === folderID) {
      folder.buttons.push(button);
    }
  });
  return newFolders;
}

function removeButtonFromFolder(folders: any, buttonName: string) {
  const newFolders: any = [];

  folders.forEeach((folder: any) => {
    const newButtons: any[] = [];
    folder.buttons.forEach((button: any) => {
      if (button.name !== buttonName) {
        newButtons.push(button);
      }
    });
    folder.buttons = newButtons;
    newFolders.add(folder);
  });
  return newFolders;
}