import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DB,
}));
