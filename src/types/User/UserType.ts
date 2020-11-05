import UserPhotoType from './UserPhotoType';

export type UserType = {
    id: number,
    name: string,
    status: string,
    followed: boolean,
    photos: UserPhotoType
};

export default UserType;