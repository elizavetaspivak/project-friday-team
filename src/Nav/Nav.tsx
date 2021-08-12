import {NavLink} from 'react-router-dom';
import s from './Nav.module.css'
import React from 'react';
import packs from '../common/images/packs.png'
import profile from '../common/images/profile.png'

export function Nav() {
    return (
        <div className={s.nav}>
            <div className={s.item + s.head}>
               <NavLink to='/profile'><h1>It-incubator</h1></NavLink>
            </div>
            <div className={s.item}>
                <img src={packs} alt=""/>
                <NavLink to="/packslist" activeClassName={s.active}>Packs list</NavLink>
            </div>
            <div className={s.item}>
                <img src={profile} alt=""/>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
        </div>
    )
}