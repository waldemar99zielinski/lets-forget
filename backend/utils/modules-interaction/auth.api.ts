import { faker } from '@faker-js/faker';
import axios from 'axios';

import { SignUpRequestDto } from '@lets-forget/backend/src/modules/authentication/dto/SignUpRequest.dto';
import { SignInRequestDto } from '@lets-forget/backend/src/modules/authentication/dto/SignInRequest.dto';

import { baseUrlV1 } from '../config/url';
import { activateUserEmail } from './auth.databse';

const authUrl = baseUrlV1 + '/authentication';

export const createTestUser = async (request: Partial<SignUpRequestDto>) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const mockRequestData: SignUpRequestDto = {
        email,
        password,
        ...request
    }

    const respose = await axios.post(authUrl + '/signup', mockRequestData);

    return {...mockRequestData};
}

export interface UserSignIn
{
    id: string;
    email: string;
    password: string;
}

export interface CreateActivatedUserWithTokenResponse
{
    user: UserSignIn;
    token: string;
}

export const createActivatedUserWithToken = async (request: Partial<SignUpRequestDto>): Promise<CreateActivatedUserWithTokenResponse> => {
    const user = await createTestUser(request);

    await activateUserEmail({email: user.email});

    const signInRequest: SignUpRequestDto = {
        email: user.email,
        password: user.password
    };

    const response = await axios.post(authUrl + '/signin', signInRequest);

    return {user: response.data.user, token: response.data.token};
}