import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		AuthenticationModule,
		UserModule
	]
})
export class AppModule {}
