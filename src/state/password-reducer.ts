import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from './app-reducer';
import {RestoreAPI} from '../dal/api';


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
        dispatch(setStatusAC(true))
        RestoreAPI.restore(email)
            .then(() => {
                dispatch(emailIsSentAC(true))
                dispatch(setStatusAC(false))
            })
            .catch(res => {
                if(!res.error){
                    dispatch(setErrorAC('Some Error! More details in console.'))
                } else {
                    dispatch(setErrorAC(res.error))
                }
                dispatch(setStatusAC(false))
            })
    }
}

type ActionsType = ReturnType<typeof emailIsSentAC>