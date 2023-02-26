import * as Joi from 'joi';

export interface PatchMeRequestDto {
    username: string;
    defaultCity: string;
}

export const PatchMeRequestSchema = Joi.object<PatchMeRequestDto>({
    username: Joi.string().max(64),
    defaultCity: Joi.string().max(64)
})
    .or('username', 'defaultCity');