import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, pbkdf2 } from 'crypto';

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
}