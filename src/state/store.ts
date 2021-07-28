import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {loginReducer} from './login-reducer';
import {profileReducer} from './profile-reducer';
import {registerReducer} from './register-reducer';
import {passwordReducer} from './password-reducer';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    register: registerReducer,
    password: passwordReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;