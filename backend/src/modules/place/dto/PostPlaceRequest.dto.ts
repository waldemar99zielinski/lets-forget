import * as Joi from 'joi';

export interface PostPlaceRequestDto {
    cityId: string;

    name: string;

    street: string;
    streetNumber: string;

    latitude: number;
    longitude: number;
}

export const PostPlaceRequestSchema = Joi.object<PostPlaceRequestDto>({
    cityId: Joi.string().required(),
    
    name: Joi.string().required(),

    street: Joi.string().required(),
    streetNumber: Joi.string().required(),

    latitude: Joi
        .number()
        .min(-90)
        .max(90)
        .precision(6)
        .required(),
    longitude: Joi
        .number()
        .min(-180)
        .max(180)
        .precision(6)
        .required()
});