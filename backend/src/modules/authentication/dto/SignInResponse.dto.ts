import { User } from 'src/database/entities/user/user.entity';

export interface SignInResponse {
    user: Pick<User, 'id' | 'email' | 'username'>;
    token: string;
}