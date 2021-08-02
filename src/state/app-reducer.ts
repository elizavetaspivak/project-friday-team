import {Dispatch} from 'redux';
import {AuthAPI} from '../dal/api';
import {setIsLoggedInAC, setUserDataAC} from './login-reducer';

export type setErrorACType = {
    type: 'APP/SET-ERROR'
    error?: string | null
}

export type setStatusACType = {
    type: 'APP/SET-STATUS'
    status: boolean
}

type initialStateType = {
    status: boolean
    error?: string | null
    isInitialized: boolean
}

export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: false,
    error: null,
    isInitialized: false
}

type ActionsType = setErrorACType | setStatusACType | SetIsInitializedActionType

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
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
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setStatusAC = (status: boolean): setStatusACType => ({type: 'APP/SET-STATUS', status})
export const setErrorAC = (error: string | null): setErrorACType => ({type: 'APP/SET-ERROR', error})
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized}) as const


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true))
    AuthAPI.me().then(res => {
        dispatch(setStatusAC(false))
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserDataAC(res.data));
    })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error)
            dispatch(setStatusAC(false))
        }).finally(() => {
        dispatch(setIsInitializedAC(true))
    })
}
