import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import GoogleAuthConfig from './google-auth.config';
import JWTConfig from './jwt.config';
import MailerConfig from './mailer.config';
import WebappConfig from './webapp.config';
import QueryConfig from './query.cofig';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [
                AppConfig,
                DatabaseConfig,
                GoogleAuthConfig,
                JWTConfig,
                MailerConfig,
                WebappConfig,
                QueryConfig
            ],
        }),
    ],
})
export class ConfigModule {}
