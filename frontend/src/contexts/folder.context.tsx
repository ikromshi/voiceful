import { createContext, ReactElement, useReducer } from "react";
import { ButtonType, FolderContextType, FolderStateType, FolderType } from "../types/types";
import { FOLDER_ACTION_TYPES } from "../utils/actionTypes";

export const FolderContext = createContext<FolderContextType>({
  folders: null,
  setFolders: () => {},
  unsetFolders: () => {},
  addFolder: () => {},
  deleteFolder: () => {},
  addButton: () => {},
  deleteButton: () => {}
});

export const FolderReducer = (state: FolderStateType, action: any) => {
  const { type, payload } = action;

  switch (type){
    case FOLDER_ACTION_TYPES.SET_FOLDERS:
      return {...state, folders: payload};
    case FOLDER_ACTION_TYPES.UNSET_FOLDERS:
      return {...state, folders: null};
    case FOLDER_ACTION_TYPES.ADD_FOLDER:
      return {...state, folders: payload};
    case FOLDER_ACTION_TYPES.ADD_BUTTON:
      return {...state, folders: payload};
    case FOLDER_ACTION_TYPES.DELETE_BUTTON:
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

  const setFolders = (folders: Array<FolderType>) => {
    localStorage.setItem("folders", JSON.stringify(folders));
    dispatch({ type: FOLDER_ACTION_TYPES.SET_FOLDERS, payload: folders });
  };

  const unsetFolders = () => {
    localStorage.removeItem("folders");
    dispatch({ type: FOLDER_ACTION_TYPES.UNSET_FOLDERS, payload: null });
  }

  // need to construc a full folder before calling this method;
  const addFolder = (folders: Array<FolderType>, folder: FolderType) => {
    folders.push(folder);
    localStorage.setItem("folders", JSON.stringify(folders));
    dispatch(({ type: FOLDER_ACTION_TYPES.ADD_FOLDER, payload: folders }));
  }

  const deleteFolder = (folders: Array<FolderType>, folderName: string) => {
    const newFolders = removeFolder(folders, folderName);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.DELETE_FOLDER, payload: newFolders });
  }

  // need to provide a folder ID to add a button to the folder; need to construct a full button before calling this method;
  const addButton = (folders: Array<FolderType>, button: ButtonType) => {
    const newFolders = addButtonToFolder(folders, button);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.ADD_BUTTON, payload: newFolders });
  }

  const deleteButton = (folders: Array<FolderType>, buttonId: number) => {
    const newFolders = removeButtonFromFolder(folders, buttonId);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    dispatch({ type: FOLDER_ACTION_TYPES.DELETE_BUTTON, payload: newFolders });
  }

  const foldersInState = state.folders;
  const foldersJson = localStorage.getItem("folders");
  const folders = foldersJson !== null ? JSON.parse(foldersJson) : foldersInState;

  const value = {folders, setFolders, unsetFolders, addFolder, deleteFolder, addButton, deleteButton};

  return <FolderContext.Provider value={value}>{ children }</FolderContext.Provider>
}


function removeFolder(folders: Array<FolderType>, folderName: string) {
  const newFolders: Array<FolderType> = [];

  folders.forEach((folder: FolderType) => {
    if (folder.name !== folderName) {
      newFolders.push(folder);
    }
  });
  return newFolders;
}

function addButtonToFolder(folders: Array<FolderType>, button: ButtonType) {
  folders.forEach((folder: FolderType) => {
    if (folder.id === button.folder_id) {
      folder.buttons.push(button);
    }
  });
  return folders;
}

function removeButtonFromFolder(foldersArray: Array<FolderType>, buttonId: number) {
  
  const newFolders: Array<FolderType> = [];

  // Use Object.keys() to get an array of the keys in the object
  const keys = Object.keys(foldersArray);

  // Iterate over the keys and create a new array of folders
  keys.forEach((key: string) => {
    const folder = foldersArray[key as unknown as number];
    const newButtons: Array<ButtonType> = [];

    // Iterate over the buttons in the current folder and
    // create a new array with the specified button removed
    folder.buttons.forEach((button: ButtonType) => {
      if (button.id !== buttonId) {
        newButtons.push(button);
      }
    });

    folder.buttons = newButtons;
    newFolders.push(folder);
  });

  return newFolders;
}