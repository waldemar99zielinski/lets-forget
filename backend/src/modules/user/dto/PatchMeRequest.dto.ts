import * as Joi from 'joi';

export interface PatchMeRequestDto {
    username: string;
}

export const PatchMeRequestSchema = Joi.object<PatchMeRequestDto>({
    username: Joi.string().max(64).required()
});