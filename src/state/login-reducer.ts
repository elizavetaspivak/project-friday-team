import {Dispatch} from 'redux';
import {LoginType, ResponseLoginType, AuthAPI} from '../dal/api';
import {setErrorAC, setErrorACType, setStatusAC, setStatusACType} from './app-reducer';

// types
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;
export type setUserDataACType = ReturnType<typeof setUserDataAC>;

type ActionsType =
    | setIsLoggedInACType
    | setUserDataACType
    | setErrorACType
    | setStatusACType

type initialStateType = {
    isLoggedIn: boolean
    userId: string
    user: {
        _id: string,
        email: string,
        name: string,
        publicCardPacksCount: number, // количество колод
        created: any,
        updated: any,
        isAdmin: boolean,
        verified: boolean, // подтвердил ли почту
        rememberMe: boolean,
    }
}

const initialState: initialStateType = {
    isLoggedIn: false,
    userId: '',
    user: {
        _id: '',
        email: '',
        name: '',
        publicCardPacksCount: 0, // количество колод
        created: Date,
        updated: Date,
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
    }
}


// reducer
export const loginReducer = (
    state: initialStateType = initialState,
    action: ActionsType
): initialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        case 'LOGIN/SET_USER_DATA':
            return {
                ...state,
                userId: action.userData['_id'],
                user: action.userData
            };
        default:
            return state;
    }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const);


export const setUserDataAC = (userData: ResponseLoginType) => {
    return {
        type: 'LOGIN/SET_USER_DATA',
        userData,
    } as const;
};


// thunks
export const loginTC =
    (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC(true));
        AuthAPI.login(data)
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(res.data));
                dispatch(setStatusAC(false));
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : e.message + ', more details in the console';
                dispatch(setErrorAC(error));
                dispatch(setStatusAC(false));
            });
    };

export const getMeTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true))
    AuthAPI.me().then((res) => {
        dispatch(setIsLoggedInAC(true));
        dispatch(setUserDataAC(res.data));
        dispatch(setStatusAC(false))
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    AuthAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false));
            dispatch(setStatusAC(false));
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : e.message + ', more details in the console';
            dispatch(setErrorAC(error));
            dispatch(setStatusAC(false));
        });
};
