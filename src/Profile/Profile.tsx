import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutTC} from '../state/login-reducer';
import {AppRootStateType} from '../state/store';
import s from './Profile.module.css';
import {Tables} from '../Table/Table';
import userAva from '../common/images/UserAvatar.png'

export function Profile() {
    const dispatch = useDispatch();

    let user = useSelector<AppRootStateType, any>(state => state.login.user)

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
            <div className={s.profileContainer}>
                <div className={s.profileInfo}>
                    <div>
                        <div className={s.photoProfile}>
                            <img src={userAva} alt=""/>
                        </div>
                        <div>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <button onClick={logoutHandler}>Sing out</button>
                        </div>
                    </div>
                   <div>
                       <p>Number of cards</p>
                   </div>
                </div>
                <div className={s.table}>
                    <Tables/>
                </div>
            </div>
        </div>
    );
}
