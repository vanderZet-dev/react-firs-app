import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { friendsSelectors, friendsThunks } from '../../../redux/friend-reducer';
import Friend from './Friend/Friend';
import s from './Friends.module.css';

function Friends(props) {
    const dispatch = useDispatch();
    let friendsData = props.friends.friends;
    let friendsElements = friendsData.map(fr => (<Friend state={fr} key={fr.id}/>));

    const count = useSelector(friendsSelectors.getCount);     

    return (
        <div className={s.friendsWrapper}>
            Friends:
            <div className={s.friends}>
                {friendsElements}
            </div>            
        </div>
        
    );
}

export default Friends;