import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';
import s from './Navbar.module.css';

const NavBar = (props) => {
    return (
      <nav className={s.nav}>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>          
      </div>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>          
      </div>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/news" activeClassName={s.active}>News</NavLink>          
      </div>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/music" activeClassName={s.active}>Music</NavLink>          
      </div>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>          
      </div>
      <div className = {`${s.item} ${s.active}`}>
        <NavLink to="/users" activeClassName={s.active}>Users</NavLink>          
      </div>
      <Friends friends={props.friends}/>           
    </nav>
    );
}

export default NavBar;