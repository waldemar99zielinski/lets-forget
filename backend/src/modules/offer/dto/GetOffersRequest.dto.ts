import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { latitudeSchema, longitudeSchema } from 'src/common/validation/coordinates';

export interface GetOffersQueryDto {
    placeId?: string;
    type?: string;
    priceMax?: number;
    date: Date;

    //location

    city?: string,

    // coordinates of bounds
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude

    //pagination
    page?: string;
    size?: number;
}

export const GetOffersQuerySchema = Joi.object<GetOffersQueryDto>({
    placeId: Joi.string().uuid({version: 'uuidv4'}),
    type: Joi.string(),
    priceMax: Joi.number(),
    date: Joi.date(),

    //location

    city: Joi.string(),

    n: latitudeSchema.greater(Joi.ref('s')),
    s: latitudeSchema,
    w: longitudeSchema,
    e: longitudeSchema.greater(Joi.ref('w')),

    //pagination by id
    page: Joi.string().uuid({version: 'uuidv4'}),
    size: Joi.number().integer()
})
    .rename('place-id', 'placeId')
    .rename('price-max', 'priceMax')
    .or(
        'placeId',
        'type',
        'priceMax',
        'date',
        'n',
        'city'
    )
    .or('placeId', 'date')
    .and('n', 's', 'w', 'e')
    .or('placeId', 'city', 'n');