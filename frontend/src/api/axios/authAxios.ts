import axios from 'axios';
import { getPath, Path } from 'src/router/routes';

export enum AxiosHeaders {
    Authorization = 'Authorization'
}

export const authAxios = axios.create();

authAxios.interceptors.response.use(function (request) {
    return request;
}, function (error) {

    if(error.response && error.response.status === 401) {
        window.location.href = getPath(Path.signOut);
    }

    return Promise.reject(error);
});

export const bindAuthAxiosToken = (token: string) => {
    authAxios.defaults.headers[AxiosHeaders.Authorization] = `Bearer ${token}`;
};