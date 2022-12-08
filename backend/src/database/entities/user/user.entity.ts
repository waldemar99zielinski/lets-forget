import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum AuthStrategy {
    local = 'local',
    google = 'google' 
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    email: string;

    @Column({name: 'is_email_confirmed', type: 'boolean'})
    isEmailConfirm: boolean;

    @Column({name: 'user_name', type: 'text', unique: true})
    userName: string;

    @Column({name: 'password_hash', type: 'text', nullable: true})
    passwordHash: string | null;

    @Column({name: 'password_salt', type: 'text', nullable: true})
    passwordSalt: string | null;

    @Column({name: 'auth_strategy', type: 'enum', enum: AuthStrategy})
    authStrategy: AuthStrategy;
}