import axios from 'axios';

import {backendBase} from 'src/api/endpoints';

const authenticationUrl = backendBase + '/authentication';

interface SignUpResponseData {

}

export const signUpApi = async (email: string, password: string) => {
    return axios.post<SignUpResponseData>(authenticationUrl + '/signup', {
        email,
        password
    });
};

interface ActivateEmailResponseData {

}

export const activateEmailApi = async (token: string) => {
    return axios.post<ActivateEmailResponseData>(authenticationUrl + '/activate', {
        token
    });
}

interface SignInResponseData {
    user: {
        email: string,
        username: string
    },
    token: string
}

export const signInApi = async (email: string, password: string) => {
    return axios.post<SignInResponseData>(authenticationUrl + '/signin', {
        email,
        password
    });
};