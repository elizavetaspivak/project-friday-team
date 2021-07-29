import { Dispatch } from "redux";
import { LoginType, ResponseLoginType } from "../dal/api";
import { AuthAPI } from "../dal/api";
import { setErrorAC, setStatusAC } from "./register-reducer";

// types
type InitialStateType = typeof initialState;

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setErrorAC>;

const initialState = {
  isLoggedIn: false as boolean,
  user: {
    _id: "",
    email: "",
    name: "",
    publicCardPacksCount: 0, // количество колод
    created: Date,
    updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
  } as ResponseLoginType | {},
};


// reducer
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

export const setUserDataAC = (userData: ResponseLoginType) => {
  //  debugger
  return {
    type: "LOGIN/SET_USER_DATA",
    userData,
  } as const;
};

// thunks
export const loginTC =
  (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC(true));
    AuthAPI.login(data)
      .then((res) => {
        dispatch(setIsLoggedInAC(true));
        dispatch(setUserDataAC(res.data));
        dispatch(setStatusAC(false));
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ", more details in the console";
        dispatch(setErrorAC(error));;
        dispatch(setStatusAC(false));
      });
  };
  
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatusAC(true));
  AuthAPI.logout()
    .then((res) => {
      dispatch(setIsLoggedInAC(false));
      dispatch(setStatusAC(false));
    })
    .catch((e) => {
      const error = e.response
        ? e.response.data.error
        : e.message + ", more details in the console";
      dispatch(setErrorAC(error));
      dispatch(setStatusAC(false));
    });
};
