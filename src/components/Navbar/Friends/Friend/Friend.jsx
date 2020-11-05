import React from 'react';
import s from './Friend.module.css';

function Friend(props) {

    return (
        <div className={s.friend}>
            <div>
                <img src={props.state.avatar} />
            </div>
            <div>
                {props.state.name}
            </div>
            
        </div>
    );
}

export default Friend;