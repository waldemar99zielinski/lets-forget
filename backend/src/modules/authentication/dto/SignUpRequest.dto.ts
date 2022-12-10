import * as Joi from 'joi';

export interface SignUpRequestDto {
    email: string,
    password: string
}

export const SignUpRequestSchema = Joi.object<SignUpRequestDto>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
