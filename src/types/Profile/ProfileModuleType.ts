import { PostType } from "./PostType";

type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfileType ={
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type ProfileModuleType = {
    profile: ProfileType | null,
    profileStatus: string,
    posts: Array<PostType>,
    isFetching: boolean,
    profileDataEditMode: boolean
};