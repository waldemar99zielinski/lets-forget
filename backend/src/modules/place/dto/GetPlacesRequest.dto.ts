import * as Joi from 'joi';

export interface GetPlacesQueryDto {
    city?: string;
    name?: string;
    street?: string;
    latitude?: number;
    longitude?: number;
    // in km
    radius?: number;
}

export const GetPlacesQuerySchema = Joi.object<GetPlacesQueryDto>({
    city: Joi.string(),
    name: Joi.string(),
    street: Joi.string(),
    latitude: Joi
        .number()
        .min(-90)
        .max(90)
        .precision(6),
    longitude: Joi
        .number()
        .min(-180)
        .max(180)
        .precision(6),
    radius: Joi
        .number()
        .integer()
        .min(1)
        .max(20),
})
    .or('city', 'name', 'street', 'latitude', 'longitude')
    .and('latitude', 'longitude', 'radius');