import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from './Login/Login';
import {Register} from './Register/Register';
import {Profile} from './Profile/Profile';
import {PasswordRecovery} from './PasswordRecovery/PasswordRecovery';
import {CreateNewPassword} from "./TypeNewPassword/CreateNewPassword";
import {Nav} from './Nav/Nav';
import {TestPage} from './Test/Test';
import {Error} from './Error/Error';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {LinearProgress} from '@material-ui/core';
import {PasswordRecoveryConfirmation} from "./PasswordRecovery/PasswordRecoveryConfirmation";

function App() {
    let status = useSelector<AppRootStateType, boolean>(state => state.register.status)

    return (
        <div className="App">
            <Nav/>
            {status && <LinearProgress color='secondary' />}
                <Switch>
                    <Route path="/login"
                           component={Login}/>
                    <Route path="/register"
                           render={() => <Register/>}/>
                    <Route path="/profile"
                           render={() => <Profile/>}/>
                    <Route exact path="/recovery"
                           render={() => <PasswordRecovery/>}/>
                    <Route exact path="/recoveryconfirmation"
                           render={() => <PasswordRecoveryConfirmation/>}/>
                    <Route exact path="/newpassword/:token"
                           render={() => <CreateNewPassword/>}/>
                    <Route exact path="/testpage"
                           render={() => <TestPage/>}/>
                    <Route exact path="*"
                           render={() => <Error/>}/>
                </Switch>
        </div>
    );
}

export default App;
