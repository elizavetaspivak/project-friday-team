import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {loginReducer} from './login-reducer';
import {profileReducer} from './profile-reducer';
import {registerReducer} from './register-reducer';
import {passwordRecoveryReducer} from './password-reducer';
import {newPasswordReducer} from "./newPassword-reducer";
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    register: registerReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;