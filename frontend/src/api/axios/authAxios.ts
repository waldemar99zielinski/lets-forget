import axios from 'axios';

export enum AxiosHeaders {
    Authorization = 'Authorization'
}

export const authAxios = axios.create();

export const bindAuthAxiosToken = (token: string) => {
    authAxios.defaults.headers[AxiosHeaders.Authorization] = `Bearer ${token}`;
};