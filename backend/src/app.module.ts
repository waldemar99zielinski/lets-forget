import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';

// Global modules
import { JWTModule } from './utils/jwt/jwt.module';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		AuthenticationModule,
		UserModule,
		JWTModule
	]
})
export class AppModule {}
