import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { User, AuthStrategy } from 'src/database/entities/user.entity';
import { randomBytes, pbkdf2 } from 'crypto';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

// import { AuthTokenPayload } from './interfaces';

@Injectable()
export class AuthenticationService {
    constructor (
        private readonly _configService: ConfigService,
    ) {}

    public async getSalt(): Promise<string> {
        return new Promise((resolve, reject) => {
            randomBytes(16, (error, bytes) => {
                error ? reject(error) : resolve(bytes.toString('hex'));
            });
        });
    }

    public async getHash(input: string, salt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            pbkdf2(input, salt, 1000, 64, 'sha512', (error, hash) => {
                error ? reject(error) : resolve(hash.toString('hex'));
            });
        });
    }

    public async signJWT(userId: string, payload?: JWTPayload): Promise<string> {
        const jwtSecret = this._getJWTSecret();

        const token = await new SignJWT({...payload})
            .setProtectedHeader({alg: 'HS256'})
            .setSubject(userId)
            .setExpirationTime('1d')
            .sign(jwtSecret);

        return token;
    }

    public async verifyJWT(token: string) {
        const jwtSecret = this._getJWTSecret();

        const {payload, protectedHeader} = await jwtVerify(token, jwtSecret);

        console.log('jwt payload', payload)
        console.log('jwt protectedHedaer', protectedHeader);
    }

    private _getJWTSecret() {
        const jwtSecret = this._configService.getOrThrow('jwt.secret');

        const encodedSecret = new TextEncoder().encode(
            jwtSecret
        );

        return encodedSecret;
    }
}