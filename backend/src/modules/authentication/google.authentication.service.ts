import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthenticationService {
    private _oAuthClient: OAuth2Client;
    constructor (
        private readonly _configService: ConfigService
    ) {
        const clientId = this._configService.get('google-auth.clientId');
        const clientSecret = this._configService.get('google-auth.clientSecret');

        this._oAuthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async getGoogleAuthUserData(googleToken: string) {
        const response = await this._oAuthClient.verifyIdToken({idToken: googleToken});

        return {email:  response.getPayload().email};
    }
}