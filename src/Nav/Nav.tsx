import {NavLink} from "react-router-dom";
import s from './Nav.module.css'
import React from 'react';
import packs from '../common/images/packs.png'

export function Nav() {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <NavLink to='/login' activeClassName={s.active}>Login</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packslist' activeClassName={s.active}><img src={packs} alt=""/>Packs list</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/testpage' activeClassName={s.active}>Test Page</NavLink>
            </div>
        </div>
    )
}