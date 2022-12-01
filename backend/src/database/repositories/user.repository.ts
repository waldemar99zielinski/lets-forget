import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "src/database/entities/user/user.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor (
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ) {
        super(_userRepository);
    }
}