import { stopSubmit } from 'redux-form';
import { PostType } from '../types/Profile/PostType';
import { PhotosType, ProfileModuleType, ProfileType } from '../types/Profile/ProfileModuleType';
import { usersApi } from './../api/api';

const PROFILE_REDUCER_MARKER = 'PROFILE_REDUCER_MARKER/';

const ADD_POST = PROFILE_REDUCER_MARKER + 'ADD-POST';
const DELETE_POST = PROFILE_REDUCER_MARKER + 'DELETE-POST';
const SET_PROFILE = PROFILE_REDUCER_MARKER + 'SET-PROFILE';
const SET_FETCHING = PROFILE_REDUCER_MARKER + 'SET-FETCHING';
const SET_PROFILE_STATUS = PROFILE_REDUCER_MARKER + 'SET-PROFILE-STATUS';
const CHANGE_PROFILE_PHOTO_SUCCESS = PROFILE_REDUCER_MARKER + 'CHANGE_PROFILE_PHOTO_SUCCESS';
const TOGGLE_PROFILE_DATA_EDIT_MODE = PROFILE_REDUCER_MARKER + 'TOGGLE_PROFILE_DATA_EDIT_MODE';


let posts: Array<PostType> = [
    { id: 1, content: 'Hi, how are you?', likesCount: 18 },
    { id: 2, content: "It's my first post 1", likesCount: 5 },
    { id: 3, content: "It's my first post 2", likesCount: 3 },
    { id: 4, content: "It's my first post 3", likesCount: 1 }
];

let initialState: ProfileModuleType = {
    profile: null,
    profileStatus: 'По умолчанию',
    posts: posts,
    isFetching: false,
    profileDataEditMode: false
};

export const profileReducer = (state: ProfileModuleType = initialState, action: any): ProfileModuleType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [{ id: 5, content: action.payload, likesCount: 0 }, ...state.posts]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case SET_PROFILE_STATUS:
            return {
                ...state,
                profileStatus: action.payload
            };
        case CHANGE_PROFILE_PHOTO_SUCCESS:
            debugger
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.payload                    
                } as ProfileType
            };
        case TOGGLE_PROFILE_DATA_EDIT_MODE:
            return {
                ...state,
                profileDataEditMode: action.payload
            };
        default:
            return state;
    }
}

type AddPostActionType = {
    type: typeof ADD_POST,
    payload: string
}

type DeletePostActionType = {
    type: typeof DELETE_POST,
    payload: number
}

type SetProfileActionType = {
    type: typeof SET_PROFILE,
    payload: ProfileType
}

type SetIsFetchingActionType = {
    type: typeof SET_FETCHING,
    payload: boolean
}

type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS,
    payload: string
}

type ChangeProfilePhotoSuccessActionType = {
    type: typeof CHANGE_PROFILE_PHOTO_SUCCESS,
    payload: PhotosType
}

type ToggleProfileDataEditModeActionType = {
    type: typeof CHANGE_PROFILE_PHOTO_SUCCESS,
    payload: boolean
}

export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, payload: newPostText });
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, payload: postId });
export const setProfile = (profile: ProfileType): SetProfileActionType => ({ type: SET_PROFILE, payload: profile });
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: SET_FETCHING, payload: isFetching });
export const setProfileStatus = (profileStatus: string): SetProfileStatusActionType => ({ type: SET_PROFILE_STATUS, payload: profileStatus });
export const changeProfilePhotoSuccess = (photos: PhotosType): ChangeProfilePhotoSuccessActionType => ({ type: CHANGE_PROFILE_PHOTO_SUCCESS, payload: photos });
export const toggleProfileDataEditMode = (mode: boolean): ToggleProfileDataEditModeActionType => ({ type: TOGGLE_PROFILE_DATA_EDIT_MODE, payload: mode });



export const getProfile = (userId: number) => {

    return async (dispatch: any) => {

        dispatch(setIsFetching(true));
        let data = await usersApi.getProfile(userId);

        dispatch(setProfile(data));
        dispatch(setIsFetching(false));

    }
}

export const getProfileStatus = (userId: number) => {

    return async (dispatch: any) => {

        let data = await usersApi.getProfileStatus(userId);

        dispatch(setProfileStatus(data));

    }
}

export const updateProfileStatus = (profileStatus: string) => {

    return async (dispatch: any) => {

        let response = await usersApi.updateProfileStatus(profileStatus);

        let resultCode = response.resultCode;
        if (resultCode === 0) {
            dispatch(setProfileStatus(profileStatus));
        }

    }
}

export const addNewPost = (newPostText: string) => {

    return (dispatch: any) => {

        dispatch(addPost(newPostText));
    }
}

export const changeProfilePhoto = (photo: File) => {

    return async (dispatch: any) => {
        let response = await usersApi.changeProfilePhoto(photo);

        let resultCode = response.resultCode;
        if (resultCode === 0) {
            dispatch(changeProfilePhotoSuccess(response.data.photos));
        }
        else alert("error code: " + resultCode);
    }
}


interface ContactsErrorsType {
    [key: string]: string
}

interface ContactsErrorsWholeType {
    contacts: ContactsErrorsType
}

export const updateProfileData = (profile: any) => {

    return async (dispatch: any) => {

        let response = await usersApi.updateProfileData(profile);

        let resultCode = response.resultCode;
        if (resultCode === 0) {
            debugger
            dispatch(getProfile(profile.userId))
            dispatch(toggleProfileDataEditMode(false));
        }
        else {
            let errors = response.messages;

            let unparsedErrors = [];
            let contactsErrorObj: ContactsErrorsWholeType = { contacts: {} };
            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i++) {
                    let errorMessage = errors[i];
                    if (errorMessage.includes("Contacts")) {

                        let urlErrorName = errorMessage.substring(
                            errorMessage.lastIndexOf(">") + 1,
                            errorMessage.lastIndexOf(")")
                        );
                        urlErrorName = urlErrorName.trim();
                        urlErrorName = urlErrorName.charAt(0).toLowerCase() + urlErrorName.substring(1);
                        debugger
                        contactsErrorObj.contacts[urlErrorName] = errorMessage;
                    }
                    else {
                        unparsedErrors.push(errorMessage);
                    }
                }
            }

            if (contactsErrorObj.contacts) {
                let action = stopSubmit("ProfileDataEditor", contactsErrorObj);
                dispatch(action);
            }

            if (unparsedErrors.length > 0) {
                let action = stopSubmit("ProfileDataEditor", { "_error": unparsedErrors });
                dispatch(action);
            }

        }
    }
}