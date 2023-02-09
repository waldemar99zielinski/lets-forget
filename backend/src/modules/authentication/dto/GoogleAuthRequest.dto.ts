import * as Joi from 'joi';

export interface GoogleAuthRequestDto {
    token: string;
}

export const GoogleAuthRequestSchema = Joi.object<GoogleAuthRequestDto>({
    token: Joi.string().required(),
});