import { AppStateType } from './redux-store';
import { createSelector } from 'reselect'

const getUsersSelector = (state: AppStateType) => state.usersPage.users;
const getTotalElementsSelector = (state: AppStateType) => state.usersPage.totalElements;

export const getUsers = createSelector(
    getUsersSelector,
    users => users.filter(() => true)
);

export const getTotalElements = createSelector(
    getTotalElementsSelector,
    totalElements => totalElements
);