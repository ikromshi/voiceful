import { createContext, ReactElement, useReducer } from "react";
import { UserActionType, UserStateType, UserType, UserContextType } from "../types/types";
import { USER_ACTION_TYPES } from "../utils/actionTypes";

export const UserContext = createContext<UserContextType>({
  setCurrentUser: () => {},
  unsetCurrentUser: () => {},
  currentUser: null
});

const UserReducer = (state: UserStateType, action: UserActionType) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload};
    case USER_ACTION_TYPES.UNSET_CURRENT_USER:
      return {...state, currentUser: payload};
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
} 

const INITIAL_STATE = {
  currentUser: null,
  isUserSignedIn: false
};

export const UserProvider = ({ children }: {children: ReactElement}) => {
  const [ state, dispatch ] = useReducer(UserReducer, INITIAL_STATE);
  const { currentUser } = state;
  
  const setCurrentUser = (user : UserType) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const unsetCurrentUser = () => {
    dispatch({ type: USER_ACTION_TYPES.UNSET_CURRENT_USER, payload: null });
  }

  const value = {currentUser, setCurrentUser, unsetCurrentUser};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}