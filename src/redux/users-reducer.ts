import { AppStateType } from './redux-store';
import { usersApi } from '../api/api';
import UsersPageDataType from '../types/User/UsersPageDataType';
import UserType from '../types/User/UserType';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_USERS = 'SET-USERS';
const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLLOW';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_FETCHING = 'SET-FETCHING';
const MODIFY_FOLLOWS_IN_PROGRESS_USERS = 'MODIFY-FOLLOWS-IN-PROGRESS-USERS';

let initialState: UsersPageDataType = {
    users: [],
    totalElements: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followsInProgressUsers: []
};

export const usersReducer = (state: UsersPageDataType = initialState, action: ActionsType): UsersPageDataType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.payload]
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalElements: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u: UserType) => {
                    if (u.id === action.payload) {
                        return { ...u, followed: true };
                    }
                    return u;
                })
            };
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map((u: UserType) => {
                    if (u.id === action.payload) {
                        return { ...u, followed: false };
                    }
                    return u;
                })
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case MODIFY_FOLLOWS_IN_PROGRESS_USERS:
            return {
                ...state,
                followsInProgressUsers: action.payload.inProgress
                    ? [...state.followsInProgressUsers, action.payload.userId]
                    : state.followsInProgressUsers.filter(id => id !== action.payload.userId)
            }
        default:
            return state;
    }
}

type ActionsType = 
FollowSuccessActionType | UnFollowSuccessActionType | 
SetUsersActionType | SetTotalCountActionType | 
SetCurrentPageActionType | SetFetchingActionType | 
ModifyFollowsInProgressUsersActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    payload: number
}

type UnFollowSuccessActionType = {
    type: typeof UN_FOLLOW,
    payload: number
}

type SetUsersActionType = {
    type: typeof SET_USERS,
    payload: Array<UserType>
}

type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT,
    payload: number
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    payload: number
}

type SetFetchingActionType = {
    type: typeof SET_FETCHING,
    payload: boolean
}

type ModifyFollowsInProgressUsersActionType = {
    type: typeof MODIFY_FOLLOWS_IN_PROGRESS_USERS,
    payload: { inProgress: boolean, userId: number }
}

const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, payload: userId });
const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({ type: UN_FOLLOW, payload: userId });
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, payload: users });
const setTotalCount = (totalCount: number): SetTotalCountActionType => ({ type: SET_TOTAL_COUNT, payload: totalCount });
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, payload: currentPage });
const setFetching = (isFetching: boolean): SetFetchingActionType => ({ type: SET_FETCHING, payload: isFetching });
const modifyFollowsInProgressUsers = (inProgress: boolean, userId: number): ModifyFollowsInProgressUsersActionType => ({ type: MODIFY_FOLLOWS_IN_PROGRESS_USERS, payload: { inProgress, userId } });



type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => (dispatch) => {
    
    dispatch(setCurrentPage(currentPage));
    dispatch(setFetching(true));
    usersApi.getUsers(currentPage, pageSize).then(data => {
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
        dispatch(setFetching(false));
    });
};

export const follow = (userId: number): ThunkType => (dispatch) => {

    dispatch(modifyFollowsInProgressUsers(true, userId));
    usersApi.follow(userId).then(data => {
        let resultCode = data.resultCode;
        if (resultCode === 0) {
            dispatch(followSuccess(userId));
        }
    }).finally(() => dispatch(modifyFollowsInProgressUsers(false, userId)));
}

export const unFollow = (userId: number): ThunkType => (dispatch) => {

    dispatch(modifyFollowsInProgressUsers(true, userId));
    usersApi.unFollow(userId)
        .then(data => {
            let resultCode = data.resultCode;
            if (resultCode === 0) {
                dispatch(unFollowSuccess(userId));
            }
        }).finally(() => dispatch(modifyFollowsInProgressUsers(false, userId)));
}