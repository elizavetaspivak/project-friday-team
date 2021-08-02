import {NavLink} from "react-router-dom";
import s from './Nav.module.css'
import {LinearProgress} from '@material-ui/core';
import React from 'react';

export function Nav() {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <NavLink to='/login' activeClassName={s.active}>Login</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/register' activeClassName={s.active}>Register</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/recovery' activeClassName={s.active}>Password Recovery</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/newpassword/:token' activeClassName={s.active}>Type New Password</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/testpage' activeClassName={s.active}>Test Page</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packslist' activeClassName={s.active}>Packs list</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='*' activeClassName={s.active}>Error 404</NavLink>
            </div>
        </div>
    )
}