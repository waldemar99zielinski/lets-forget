import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/utils/logger';
import { User } from 'src/database/entities/user/user.entity';
import { UserRepository } from 'src/database/repositories/user.repository';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		LoggerModule
	],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository
	],
    exports: [
        UserService
    ]
})
export class UserModule {}
