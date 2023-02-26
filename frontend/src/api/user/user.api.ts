import { authAxios } from 'src/api/axios/authAxios';

import { backendBaseV1 } from 'src/api/endpoints';

const userUrl = backendBaseV1 + '/user';

export type GetUserMe = User;

export const getUserMe = async () => {
    const response = await authAxios.get<GetUserMe>(userUrl + '/me');

    return response.data;
}

export type PatchUserMe = Partial<Pick<User, 'username' | 'defaultCity'>>;

export const patchUserMe = async (request: PatchUserMe) => {
    const response = await authAxios.patch<GetUserMe>(userUrl + '/me', request);
}