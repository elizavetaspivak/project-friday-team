import React from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import {Login} from './Login/Login';
import {Register} from './Register/Register';
import {Profile} from './Profile/Profile';
import {PasswordRecovery} from './PasswordRecovery/PasswordRecovery';
import {TypeNewPassword} from './TypeNewPassword/TypeNewPassword';
import {Nav} from './Nav/Nav';
import {TestPage} from './Test/Test';
import {Error} from './Error/Error';

function App() {
    return (
        <div className="App">
            <Nav/>
            <Switch>
                <Route path="/login"
                       render={() => <Login/>}/>
                <Route path="/register"
                       render={() => <Register/>}/>
                <Route path="/profile"
                       render={() => <Profile/>}/>
                <Route exact path="/recovery"
                       render={() => <PasswordRecovery/>}/>
                <Route exact path="/newpassword"
                       render={() => <TypeNewPassword/>}/>
                <Route exact path="/testpage"
                       render={() => <TestPage/>}/>
                <Route exact path="*"
                       render={() => <Error/>}/>
            </Switch>
        </div>
    );
}

export default App;
