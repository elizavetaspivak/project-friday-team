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

export const getMeTC = () => (dispatch: Dispatch) => {
  AuthAPI.me().then((res) => {
    dispatch(setIsLoggedInAC(true));
    dispatch(setUserDataAC(res.data));
  });
};
