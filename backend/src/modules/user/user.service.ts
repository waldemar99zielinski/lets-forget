import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { LoggerService } from 'src/utils/logger/logger.service';
import { User, AuthStrategy } from 'src/database/entities/user/user.entity';
// import { GenericErrorCodes } from 'src/utils/errors/interfaces';

@Injectable()
export class UserService {
    constructor (
        private readonly _userRepository: UserRepository,
        private readonly _logger: LoggerService
    ) {}

    public async createUserLocal(user: Pick<User, 'email' | 'passwordHash' | 'passwordSalt'>) {
        const userToCreate = {
            ...user,
            authStrategy: AuthStrategy.local
        } as User;

        return this._userRepository.create(userToCreate);
    }

    // public async getUsers() {
    //     return this._userRepository.findAll();
    // }

    public async getUser(id: string): Promise<User | null> {
        const user = await this._userRepository.findOneById(id);

        return user;
    }

    // public async getUserByEmail(email: string) {
    //     const user = await this._userRepository.findUserByEmail(email);

    //     if(!user)
    //         throw {code: GenericErrorCodes.not_found};
        
    //     return user;
    // }

    public async getUserByEmailAndAuthStategy(email: string, authStategy: AuthStrategy): Promise<User | null> {
        const users = await this._userRepository.findUserByEmailAndAuthStategy(email, authStategy);

        if(users.length === 0)
            return null;

        if(users.length > 1)
        {
            this._logger.error('Found many users with email %s and auth strategy %s', email, authStategy);
            throw new Error('User email auth strategy not unique')
        }
           
        return users[0];
    }

    public async activateEmailForUserId(userId: string): Promise<void> {
        return this._userRepository.activateEmailByUserId(userId);
    }

    public async patchUser(userId: string, user: Partial<User>) {
        return this._userRepository.getRepository().update(userId, user);
    }

    // public async updateUser(user: User) {
    //     return this._userRepository.updateOneById(user.id, user);
    // }

    // public async deleteUser(id: string) {
    //     return this._userRepository.deleteOneById(id);
    // }
}