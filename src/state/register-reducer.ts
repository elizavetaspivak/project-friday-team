import {Dispatch} from 'redux'
import {AuthAPI} from '../dal/api';


type setErrorACType = {
    type: 'APP/SET-ERROR'
    error?: string | null
}

type setStatusACType = {
    type: 'APP/SET-STATUS'
    status: boolean
}

type setRegisterStatusACType = {
    type: 'APP/SET-REGISTER-STATUS'
    isRegister: boolean
}

type initialStateType = {
    isRegister: boolean
    status: boolean
    error?: string | null
}

const initialState = {
    isRegister: false,
    status: false,
    error: null
}

type ActionsType = setErrorACType | setStatusACType | setRegisterStatusACType

export const registerReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'APP/SET-STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'APP/SET-REGISTER-STATUS':
            return {
                ...state,
                isRegister: action.isRegister
            }
        default:
            return state
    }
}

export const setStatusAC = (status: boolean): setStatusACType => ({type: 'APP/SET-STATUS', status})
export const setErrorAC = (error: string | null): setErrorACType => ({type: 'APP/SET-ERROR', error})
export const setRegisterStatus = (isRegister: boolean): setRegisterStatusACType => ({
    type: 'APP/SET-REGISTER-STATUS',
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