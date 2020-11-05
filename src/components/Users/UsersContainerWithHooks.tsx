import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { follow, unFollow, requestUsers } from '../../redux/users-reducer';
import { getUsers, getTotalElements } from '../../redux/users-selectors';
import { UserType } from '../../types/User/UserType';
import Loader from '../Common/Loader/Loader';
import Users from './Users';

type MapDispatchPropsType = {    
    requestUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
}

type MapStatePropsType = {    
    currentPage: number,
    pageSize: number,
    totalElements: number,    
    isFetching: boolean,
    users: Array<UserType>,    
    followsInProgressUsers: Array<number>    
}

type CommonPropsType = {
    pageTitle: string    
}

type PropsType = CommonPropsType & MapStatePropsType & MapDispatchPropsType

function UsersContainerWithHooks(props: PropsType) {

    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize);
    },
        []
    );

    const onCurrentPageChanged = (currentPage: number) => {
        props.requestUsers(currentPage, props.pageSize);
    }


    return (
        <div>            
            {props.isFetching ? <Loader /> : null}
            <div>
                {props.pageTitle}
            </div>
            <Users
                users={props.users}
                totalElements={props.totalElements}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onCurrentPageChanged={onCurrentPageChanged}
                unFollow={props.unFollow}
                follow={props.follow}
                followsInProgressUsers={props.followsInProgressUsers}
            />
        </div>
    );

};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalElements: getTotalElements(state),
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followsInProgressUsers: state.usersPage.followsInProgressUsers
    };
}

export default connect<MapStatePropsType, MapDispatchPropsType, CommonPropsType, AppStateType>(mapStateToProps, {
    follow,
    unFollow,
    requestUsers   
})(UsersContainerWithHooks);