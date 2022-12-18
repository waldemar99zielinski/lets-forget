import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User, AuthStrategy } from "src/database/entities/user/user.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor (
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ) {
        super(_userRepository);
    }

    public async findUserByEmailAndAuthStategy(email: string, authStrategy: AuthStrategy) {
        return this._userRepository.createQueryBuilder()
            .where({email})
            .andWhere({authStrategy})
            .getMany();
    }

    public async activateEmailByUserId(userId: string) {
        await this._userRepository.createQueryBuilder()
            .update({isEmailConfirmed: true})
            .where({id: userId})
            .execute();
    }
}