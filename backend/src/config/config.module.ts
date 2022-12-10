import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import JWTConfig from './jwt.config';
import MailerConfig from './mailer.config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [
                AppConfig,
                DatabaseConfig,
                JWTConfig,
                MailerConfig
            ],
        }),
    ],
})
export class ConfigModule {}
