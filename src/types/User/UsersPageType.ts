import UsersPageDataType from "./UsersPageDataType";
import UserType from "./UserType";

type UsersPageType = {
    usersPageData: UsersPageDataType,
    setUsers: (users: Array<UserType>) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
}

export default UsersPageType;