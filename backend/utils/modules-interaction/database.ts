import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DBInterface {
    c?: DataSource;
}

export const DB = () => new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as any,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

export enum errorCodes {
    uniqueViolation = "23505"
}