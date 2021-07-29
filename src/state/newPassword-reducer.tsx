import {Dispatch} from "redux";
import {RestoreAPI} from "../PasswordRecovery/PasswordRecoveryAPI";
import * as React from "react";


type ActionsType = ReturnType<typeof passwordSentAC>


type InitialStateType = {
    passwordSent: boolean
}

const initialState = {
    passwordSent: false
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/PASSWORD-SENT':
            return {
                ...state,
                passwordSent: action.passwordSent
            }
        default:
            return state
    }
}

export const passwordSentAC = (passwordSent: boolean) => ({type: 'APP/PASSWORD-SENT', passwordSent})


export const createNewPasswordTC = (password: string, token: any) => {
    return (dispatch: Dispatch) => {
        RestoreAPI.create(password, token)
            .then(res=> alert("Success"))
            .catch(err => (console.log("Error")))
        dispatch(passwordSentAC(true))


    }
}

