import React from 'react';
import styles from './Users.module.css';
import { Paginator } from '../Common/Paginator/Paginator';
import User from './User';
import UserType from '../../types/User/UserType';

type PropsType = {
    totalElements: number,
    pageSize: number,
    currentPage: number,
    onCurrentPageChanged: (pageNumber: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    users: Array<UserType>
    followsInProgressUsers: Array<number>
}

function Users(props: PropsType) {

    return (
        <div className={styles.users}>
            <Paginator totalElements={props.totalElements}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onCurrentPageChanged={props.onCurrentPageChanged} />
            {props.users.map((u) => (
                <User user={u} followsInProgressUsers={props.followsInProgressUsers} follow={props.follow} unFollow={props.unFollow} />
            ))}
        </div>
    );
}

export default Users;