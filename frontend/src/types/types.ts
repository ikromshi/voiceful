export type VoiceSelectorProps = {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export type BackendDataType = {
  posts: {
    title: string;
    body: string;
    id: number;
  }[]
};

export type UserType = null | {
  id: number;
  name: string;
  email: string;
  password: string;
  voice: string;
  access_token: string;
}

export type UserStateType = {
  currentUser: UserType;
}

export type UserActionType = {
  type: string;
  payload: UserType;
}

export type UserContextType = {
  setCurrentUser: (user: UserType) => void;
  unsetCurrentUser: () => void;
  currentUser: UserType;
}

export type FolderType = {
  id: number,
  name: string,
  user_id: number,
  buttons: Array<ButtonType>
}

export type ButtonType = {
  id: number,
  name: string,
  folder_id: number,
}

export type FolderContextType = {
  folders: null | Array<FolderType>;
  setFolders: (folders: Array<FolderType>) => void,
  unsetFolders: () => void,
  addFolder: (folders: Array<FolderType>, folder: FolderType) => void,
  deleteFolder: (folders: Array<FolderType>, folderName: string) => void,
  addButton: (folders: Array<FolderType>, button: ButtonType) => void,
  deleteButton: (folders: Array<FolderType>, buttonId: number) => void}

export type FolderStateType = {
  folders: Array<FolderType>;
}

export type FolderActionType = {
  type: string;
  payload: Array<FolderType>;
}