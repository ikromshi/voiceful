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
  name: string | null;
  email: string | null;
  password: string | null;
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