import Axios from "axios"
import LoginDataType from "../types/User/LoginDataType";

const instance = Axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '14c9b8ce-dc3f-42e3-a24a-4e0c8efd8cbd'
        }
    }
);

export const usersApi = {

    getUsers(currentPage: number = 1, pageSize: number = 5) {
        let request = `users?page=${currentPage}&count=${pageSize}`;
        return instance.get(request).then(Response => { return Response.data });
    },

    getAuthState() {
        let stringRequest = 'auth/me';
        return instance.get(stringRequest).then(Response => { return Response.data });
    },

    login(loginData: LoginDataType) {
        let stringRequest = 'auth/login';
        return instance.post(stringRequest, loginData).then(Response => { return Response.data });
    },

    logout() {
        let stringRequest = 'auth/login';
        return instance.delete(stringRequest).then(Response => { return Response.data });
    },

    follow(userId: number) {
        let stringRequest = `follow/${userId}`;
        return instance.post(stringRequest).then(Response => { return Response.data });
    },

    unFollow(userId: number) {
        let stringRequest = `follow/${userId}`;
        return instance.delete(stringRequest).then(Response => { return Response.data });
    },

    getProfile(userId: number) {
        let stringRequest = `profile/${userId}`;
        return instance.get(stringRequest).then(Response => { return Response.data });
    },

    getProfileStatus(userId: number) {
        let stringRequest = `profile/status/${userId}`;
        return instance.get(stringRequest).then(Response => { return Response.data });
    },

    updateProfileStatus(profileStatus: string) {
        let stringRequest = `profile/status`;
        let param = {
            status: profileStatus
        }
        return instance.put(stringRequest, param).then(Response => { return Response.data });
    },

    changeProfilePhoto(newPhoto: File) {
        let stringRequest = `profile/photo`;
        let formData = new FormData();
        formData.append("image", newPhoto);
        let headers = {
            headers: { "Content-Type": 'multipart/form-data' }
        };
        return instance.put(stringRequest, formData, headers).then(Response => { return Response.data });
    },

    updateProfileData(profile: any) {
        
        let stringRequest = `profile`;        
        return instance.put(stringRequest, profile).then(Response => { return Response.data });
    },

    getCaptchaUrl() {
        let request = `security/get-captcha-url`;
        return instance.get(request).then(Response => { return Response.data });
    }
}