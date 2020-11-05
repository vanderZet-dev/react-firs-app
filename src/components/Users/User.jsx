import React from 'react';
import styles from './Users.module.css';
import emptyUserPhoto from '../../assets/images/emptyUserPhoto.png';
import { NavLink } from 'react-router-dom';

function User(props) {

    let u = props.user;

    return (                      
            <div key={u.id} className={styles.userFrame}>
                <span>
                    <div>
                        <NavLink to={'profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : emptyUserPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed
                                ? <button disabled={props.followsInProgressUsers.some(id => id === u.id)} onClick={() => { props.unFollow(u.id) }}>NoFollow</button>
                                : <button disabled={props.followsInProgressUsers.some(id => id === u.id)} onClick={() => { props.follow(u.id) }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <div>Имя: {u.name}</div>
                    <div>Статус: {u.status ? u.status : 'Н/Д'}</div>
                </span>
            </div>            
        
    );
}

export default User;