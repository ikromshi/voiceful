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