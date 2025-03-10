import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION
}));