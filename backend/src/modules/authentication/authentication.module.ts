import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/utils/logger';
// import { ServiceConfigModule } from 'src/config/config.module';
import { User } from 'src/database/entities/user/user.entity';
// import { UserRepository } from 'src/database/repositories';
import { UserService } from 'src/modules/user/user.service';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { MailerModule } from '../mailer/mailer.module';
// import { GoogleAuthenticationService } from './google.authentication.service';
// import { AuthGuard } from './guards/Auth.guard';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		LoggerModule,
		UserModule,
		MailerModule
	],
	controllers: [AuthenticationController],
	providers: [
		AuthenticationService,
		// GoogleAuthenticationService,
		// UserService,
		// UserRepository,
	],
	exports: [AuthenticationService]
})
export class AuthenticationModule {}
