import {Dispatch} from 'redux';
import {setErrorAC, setStatusAC} from './app-reducer';
import {RestoreAPI} from '../dal/api';


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
        dispatch(setStatusAC(true))
        RestoreAPI.create(password, token)
            .then(res => {
                dispatch(passwordSentAC(true))
                dispatch(setStatusAC(false))
            })
            .catch(res => {
                if (!res.error) {
                    dispatch(setErrorAC('Some Error! More details in console.'))
                } else {
                    dispatch(setErrorAC(res.error))
                }
                dispatch(setStatusAC(false))
            })
    }
}

