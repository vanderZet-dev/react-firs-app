import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

    return (
        <div className={s.item}>
            <div>
                <img src='https://static-prod.weplay.tv/users/avatar/user_43049_a5af2c178833d173a6d3a8fdbb9d1fe8.jpeg' />
            </div>
            <div>
                {props.message}
            </div>
            <div>
                <span>likes:</span>
                <span>{props.likesCount}</span>
            </div>
            <div>
                <span>dislike</span>
            </div>
        </div>
    );
}

export default Post;