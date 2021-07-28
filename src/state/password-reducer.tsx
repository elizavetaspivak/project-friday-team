import {Dispatch} from "redux";
import {RestoreAPI} from "../PasswordRecovery/PasswordRecoveryAPI";
import {Redirect} from "react-router-dom";
import * as React from "react";
import {RedirectProps} from "react-router";
import {setIsLoggedInAC} from "./login-reducer";


type InitialStateType = {
    emailIsSent: boolean
}

const initialState = {
    emailIsSent: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/EMAIL-IS-SENT':
            return {
                ...state,
                emailIsSent: action.emailIsSent
            }
        default:
            return state
    }
}

export const emailIsSentAC = (emailIsSent: boolean) => ({type: 'APP/EMAIL-IS-SENT', emailIsSent})



export const passwordRecoveryTC = (email: string) => {
    return (dispatch: Dispatch) => {
        RestoreAPI.restore(email)
            .then()
            .catch(err => (console.log("Error")))
        dispatch(emailIsSentAC(true))


    }
}

type ActionsType = ReturnType<typeof emailIsSentAC>