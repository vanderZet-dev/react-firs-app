import { stopSubmit } from "redux-form";
import { usersApi } from "../api/api";
import LoginDataType from "../types/User/LoginDataType";

const AUTH_REDUCER_MARKER = 'AUTH_REDUCER_MARKER/';

const SET_AUTH_INFO = AUTH_REDUCER_MARKER + 'SET_AUTH_INFO';
const GET_CAPTCHA_URL_SUCCESS = AUTH_REDUCER_MARKER + 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    captchaUrl: string | null,
    isAuth: boolean
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    captchaUrl: null,
    isAuth: false
}

export let authReducer = (state: any = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_AUTH_INFO:
            return {
                ...state,
                ...action.payload
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload
            };
        default:
            return state;
    }
}

type SetAuthInfoActionPayloadType = {
    userId: number | null, 
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthInfoActionType = {
    type: typeof SET_AUTH_INFO,
    payload: SetAuthInfoActionPayloadType
}

const setAuthInfo = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthInfoActionType => ({ type: SET_AUTH_INFO, payload: { userId, email, login, isAuth } });

type GetCaptchaUrlSuccess = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: string
}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccess => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl });

export const getAuthInfo = () => {

    return (dispatch: any) => {

        usersApi.getAuthState().then(data => {

            let resultCode = data.resultCode;
            if (resultCode === 0) {

                dispatch(setAuthInfo(data.data.id, data.data.email, data.data.login, true));
            }
        })
    }
}

export const login = (loginDataSource: any) => {

    let loginData: LoginDataType = {
        email: loginDataSource.login,
        password: loginDataSource.password,
        rememberMe: loginDataSource.rememberMe ? loginDataSource.rememberMe : false,
        captcha: loginDataSource.captcha
    }

    return (dispatch: any) => {

        usersApi.login(loginData).then(data => {
            let resultCode = data.resultCode;

            if (resultCode === 0) {
                dispatch(setAuthInfo(data.data.userId, data.data.email, data.data.email, true));
            }
            else {
                if (resultCode === 10) {
                    dispatch(getCaptchaUrl());
                }

                let action = stopSubmit("login", { "_error": data.messages });
                dispatch(action);
            }
        });
    }
}

export const logout = () => {

    return (dispatch: any) => {
        return usersApi.logout().then(data => {
            let resultCode = data.resultCode;
            if (resultCode === 0) {
                dispatch(setAuthInfo(null, null, null, false));
            }
        });
    }
}

export const getCaptchaUrl = () => {

    return async (dispatch: any) => {
        const response = await usersApi.getCaptchaUrl();
        dispatch(getCaptchaUrlSuccess(response.url));
    }
}