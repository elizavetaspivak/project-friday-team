import { Dispatch } from "redux";
import { loginApi, LoginType, ResponseLoginType } from "../Login/loginApi";

const initialState = {
  isLoggedIn: false as boolean,
  user: {} as ResponseLoginType | {},
};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "LOGIN/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "LOGIN/SET_USER_DATA":
      // debugger
      return { ...state, user: action.userData };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "LOGIN/SET-IS-LOGGED-IN", value } as const);

export const setUserDataAC = (userData: ResponseLoginType) =>
  ({
    type: "LOGIN/SET_USER_DATA",
    userData,
  } as const);

// thunks
export const loginTC =
  (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    loginApi
      .login(data)
      .then((res) => {
        dispatch(setIsLoggedInAC(true));
      })
      .catch();
  };
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  loginApi
    .logout()
    .then((res) => {
      dispatch(setIsLoggedInAC(false));
    })
    .catch();
};

// export const getUserDataTC =
//   (data: ResponseLoginType) => (dispatch: Dispatch<ActionsType>) => {
//     debugger
//     dispatch(setUserDataAC(data));
//     dispatch(setIsLoggedInAC(true));
//   };

// types
type InitialStateType = typeof initialState;

type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setUserDataAC>;
