import * as Joi from 'joi';

import { latitudeSchema, longitudeSchema } from 'src/common/validation/coordinates';

export interface GetPlacesQueryDto {
    city?: string;
    name?: string;
    street?: string;

    // coordinates of bounds
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude
}

export const GetPlacesQuerySchema = Joi.object<GetPlacesQueryDto>({
    city: Joi.string(),
    name: Joi.string(),
    street: Joi.string(),
    n: latitudeSchema.greater(Joi.ref('s')),
    s: latitudeSchema,
    w: longitudeSchema,
    e: longitudeSchema.greater(Joi.ref('w'))
})
    .or('city', 'name', 'street', 'n', 's', 'w', 'e')
    .and('n', 's', 'w', 'e');