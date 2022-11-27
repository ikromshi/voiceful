import { createContext, useReducer } from "react";
import { USER_ACTION_TYPES } from "../utils/actionTypes";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null
});

const UserReducer = (state, action) => {
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
  currentUser: null
};

export const UserProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(UserReducer, INITIAL_STATE);
  const { currentUser } = state;
  
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const unsetCurrentUser = () => {
    dispatch({ type: USER_ACTION_TYPES.UNSET_CURRENT_USER, payload: null });
  }

  const value = {currentUser, setCurrentUser, unsetCurrentUser};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}