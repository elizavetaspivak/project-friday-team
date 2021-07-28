import {Dispatch} from "redux";
import {RestoreAPI} from "../PasswordRecovery/PasswordRecoveryAPI";


type InitialStateType = {
}

const initialState = {

}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case '':
            return {
                ...state
            }
        default:
            return state
    }
}


export const passwordRecoveryTC = (email: string) => {
    return (dispatch: Dispatch) => {
        RestoreAPI.restore(email)
            .then()
            .catch(err=>(console.log("Error")) )

}}

type ActionsType = {}