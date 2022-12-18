import * as Joi from 'joi';
import { JWTRegex } from 'src/utils/jwt/jwt.regex';

export interface ActivateEmailRequestDto {
    token: string
}

export const ActivateEmailRequestSchema = Joi.object<ActivateEmailRequestDto>({
    token: Joi.string().regex(JWTRegex).required(),
});