import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { follow, unFollow, requestUsers } from '../../redux/users-reducer';
import { getUsers, getTotalElements } from '../../redux/users-selectors';
import UserType from '../../types/User/UserType';
import Loader from '../Common/Loader/Loader';
import Users from './Users';

type PropsType = {
    currentPage: number,
    pageSize: number,
    totalElements: number,    
    isFetching: boolean,
    users: Array<UserType>,    
    followsInProgressUsers: Array<number>,
    requestUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
}

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    getPages() {
        let pagesCount = Math.ceil(this.props.totalElements / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return pages;
    };

    onCurrentPageChanged = (currentPage: number) => {
        this.props.requestUsers(currentPage, this.props.pageSize);
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Loader /> : null}
                <Users
                    users={this.props.users}
                    totalElements={this.props.totalElements}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onCurrentPageChanged={this.onCurrentPageChanged}
                    unFollow={this.props.unFollow}
                    follow={this.props.follow}
                    followsInProgressUsers={this.props.followsInProgressUsers}
                />
            </div>
        );
    };
};

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        totalElements: getTotalElements(state),
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followsInProgressUsers: state.usersPage.followsInProgressUsers
    };
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    requestUsers    
})(UsersContainer);