import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getMeTC, logoutTC} from '../state/login-reducer';
import {AppRootStateType} from '../state/store';
import s from './Profile.module.css';
import {useEffect} from 'react';
import {Tables} from '../Table/Table';

export function Profile() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeTC())
    }, []);

    let email = useSelector<AppRootStateType>(state => state.login.user.email)
    let userId = useSelector<AppRootStateType, any>(state => state.login.userId)

    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    );

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>;
    }
    return (
        <div className={s.profile}>
            <h1>Profile</h1>
            <div>
                Email: {email}
            </div>
            <Tables userId={userId}/>
            <div>
                <button onClick={logoutHandler}>Sing out</button>
            </div>
        </div>
    );
}
