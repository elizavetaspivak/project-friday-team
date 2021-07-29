import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { ResponseLoginType } from "../dal/api";
import { logoutTC, setIsLoggedInAC, setUserDataAC } from "../state/login-reducer";
import { getMeTC } from "../state/profile-reducer";
import { AppRootStateType } from "../state/store";
import s from "./Profile.module.css";

export function Profile() {
  const isLoginIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutTC());
  };
  const getMeHandler = () => {
    dispatch(getMeTC());
  };



  if (!isLoginIn) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div className={s.profile}>
      <p>
         Profile
         <button onClick={getMeHandler}>Get me</button>
      </p>

      <div></div>
      <div>
        <button onClick={logoutHandler}>Sing out</button>
      </div>
    </div>
  );
}
