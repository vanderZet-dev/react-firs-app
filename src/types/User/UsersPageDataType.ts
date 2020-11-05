import UserType from "./UserType";

type UsersPageDataType = {
    users: Array<UserType>,
    totalElements: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    followsInProgressUsers: Array<number>
}

export default UsersPageDataType;