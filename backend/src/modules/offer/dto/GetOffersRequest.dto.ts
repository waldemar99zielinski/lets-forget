import * as Joi from 'joi';

import { latitudeSchema, longitudeSchema } from 'src/common/validation/coordinates';

export interface GetOffersQueryDto {
    type?: string;
    // title?: string;
    priceMax?: number;

    date?: Date;

    //location

    city?: string,

    // coordinates of bounds
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude
}

export const GetOffersQuerySchema = Joi.object<GetOffersQueryDto>({
    type: Joi.string(),
    // title: Joi.string(),
    priceMax: Joi.number(),

    date: Joi.date(),

    //location

    city: Joi.string(),

    n: latitudeSchema.greater(Joi.ref('s')),
    s: latitudeSchema,
    w: longitudeSchema,
    e: longitudeSchema.greater(Joi.ref('w'))
})
    .rename('price-max', 'priceMax')
    .or(
        'type',
        'title',
        'priceMax',
        'date',
        'n',
        'city'
    )
    .and('n', 's', 'w', 'e')
    .or('city', 'n');