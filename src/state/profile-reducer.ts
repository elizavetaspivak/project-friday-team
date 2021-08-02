import { Dispatch } from "redux";
import { AuthAPI } from "../dal/api";
import { setIsLoggedInAC, setUserDataAC } from "./login-reducer";



export const profileReducer = (state = "", action: any) => {
  switch (action.type) {
    case "":
      return state;
    default:
      return state;
  }
};
