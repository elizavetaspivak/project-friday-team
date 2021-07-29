import {Dispatch} from 'redux'
import {AuthAPI} from '../dal/api';
import {setErrorAC, setErrorACType, setStatusAC, setStatusACType} from './app-reducer';


type setRegisterStatusACType = {
    type: 'SET-REGISTER-STATUS'
    isRegister: boolean
}

type initialStateType = {
    isRegister: boolean
}

const initialState = {
    isRegister: false
}

type ActionsType = setErrorACType | setStatusACType | setRegisterStatusACType

export const registerReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET-REGISTER-STATUS':
            return {
                ...state,
                isRegister: action.isRegister
            }
        default:
            return state
    }
}
export const setRegisterStatus = (isRegister: boolean): setRegisterStatusACType => ({
    type: 'SET-REGISTER-STATUS',
    isRegister
} as const)

export const CreateUserThunk = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC(true))
        AuthAPI.createUser(email, password)
            .then((res) => {
                dispatch(setStatusAC(false))
                dispatch(setRegisterStatus(true))
            })
            .catch((error) => {
                if (!error.error) {
                    dispatch(setErrorAC('Some Error! More details in console.'))
                } else {
                    dispatch(setErrorAC(error.error))
                }
                dispatch(setStatusAC(false))
            })
    }
}