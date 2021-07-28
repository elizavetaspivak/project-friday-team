import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {loginReducer} from './login-reducer';
import {profileReducer} from './profile-reducer';
import {registerReducer} from './register-reducer';
import {passwordRecoveryReducer} from './password-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    register: registerReducer,
    password: passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;