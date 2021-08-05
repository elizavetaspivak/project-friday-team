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
import {getMeTC} from './state/login-reducer';
import {PacksList} from './PacksList/PacksList';
import {Cards} from './Cards/Cards';

function App() {
    let userId = useSelector<AppRootStateType, any>(state => state.login.user._id)
    let status = useSelector<AppRootStateType, boolean>(state => state.app.status)
    let dispatch = useDispatch()

    useEffect(() => {
        userId && dispatch(getMeTC())
    }, []);


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
                <Route exact path="/packslist"
                       render={() => <PacksList/>}/>
                <Route exact path="/cards/:cardsId"
                       render={() => <Cards/>}/>
                <Route exact path="*"
                       render={() => <Error/>}/>
            </Switch>
        </div>
    );
}

export default App;