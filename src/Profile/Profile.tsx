import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ResponseLoginType } from "../Login/loginApi";
import { logoutTC, setIsLoggedInAC, setUserDataAC } from "../state/login-reducer";
import { AppRootStateType } from "../state/store";
import s from "./Profile.module.css";

export function Profile() {
  const isLoginIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );

  const userData = useSelector<AppRootStateType, ResponseLoginType | {} >(state=> state.login.user)

  const dispatch = useDispatch();


  useEffect(()=> {
  axios.post<ResponseLoginType>("https://neko-back.herokuapp.com/2.0/auth/me", {}, {withCredentials: true}).then(res=>{
      // debugger
    dispatch(setIsLoggedInAC(true));
    dispatch(setUserDataAC(res.data));
  })
  },[])



  const logoutHandler = () => {
    dispatch(logoutTC());
  };


  if (!isLoginIn) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div className={s.profile}>
      <p>
         Profile
      </p>

      <div></div>
      <div>
        <button onClick={logoutHandler}>Sing out</button>
      </div>
    </div>
  );
}
