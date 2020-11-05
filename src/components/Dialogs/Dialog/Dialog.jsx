import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css';

function Dialog(props) {
    let path = '/dialogs/' + props.id;
    let componentClassName = s.dialog + ' ' + s.active;

    return (
        <div className={componentClassName}>
            <img src={props.avatar}/>            
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    );
}

export default Dialog;