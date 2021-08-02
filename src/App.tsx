import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from './Login/Login';
import {Register} from './Register/Register';
import {Profile} from './Profile/Profile';
import {PasswordRecovery} from './PasswordRecovery/PasswordRecovery';
import {CreateNewPassword} from './TypeNewPassword/CreateNewPassword';
import {Nav} from './Nav/Nav';
import {TestPage} from './Test/Test';
import {Error} from './Error/Error';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {LinearProgress, Table} from '@material-ui/core';
import {PasswordRecoveryConfirmation} from './PasswordRecovery/PasswordRecoveryConfirmation';
import {initializeAppTC} from './state/app-reducer';

function App() {
    let status = useSelector<AppRootStateType, boolean>(state => state.app.status)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <Nav/>
            {status && <LinearProgress color="secondary"/>}
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
                {/*<Route exact path="/packslist"*/}
                {/*       render={() => <PacksList/>}/>*/}
                <Route exact path="*"
                       render={() => <Error/>}/>
            </Switch>
        </div>
    );
}

export default App;
