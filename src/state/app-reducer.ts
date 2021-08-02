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

const initialState = {
    status: false,
    error: null,
    isInitialized: false
}

type ActionsType = setErrorACType | setStatusACType

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
        default:
            return state
    }
}

export const setStatusAC = (status: boolean): setStatusACType => ({type: 'APP/SET-STATUS', status})
export const setErrorAC = (error: string | null): setErrorACType => ({type: 'APP/SET-ERROR', error})
