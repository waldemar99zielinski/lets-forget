import * as Joi from 'joi';
import { StandardOfferTypes } from 'src/types/OfferType';

export type ResourceType = 'place' | 'offer';

export interface GetResourceQuery {
    resource: ResourceType
}

const resource = Joi.string().valid('place', 'offer').required()

export const GetResourceQuerySchema = Joi.object<GetResourceQuery>({
    resource
}).unknown();

export interface GetPlacesQuery {
    resource: ResourceType
    city?: string;
    name?: string;
    street?: string;
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude
}

const latitudeSchema = Joi
    .number()
    .min(-90)
    .max(90)
    .precision(6);

const longitudeSchema = Joi
    .number()
    .min(-180)
    .max(180)
    .precision(6);

export const GetPlacesQuerySchema = Joi.object<GetPlacesQuery>({
    resource,
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

export interface GetOffersQuery {
    resource: ResourceType
    name?: string;
    type?: StandardOfferTypes;
    priceMax?: number;

    date?: Date;

    placeId?: string;
    city?: string;
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude
}

export const GetOffersQuerySchema = Joi.object<GetOffersQuery>({
    resource,
    name: Joi.string(),
    type: Joi.string().valid(...Object.values(StandardOfferTypes)),
    priceMax: Joi.number().min(0),

    date: Joi.date(),

    placeId: Joi.string().uuid({version: 'uuidv4'}),
    city: Joi.string(),
    n: latitudeSchema.greater(Joi.ref('s')),
    s: latitudeSchema,
    w: longitudeSchema,
    e: longitudeSchema.greater(Joi.ref('w'))
})
    .rename('price-max', 'priceMax')
    .or('name', 'type', 'priceMax', 'date', 'placeId', 'city', 'n', 's', 'w', 'e')
    .and('n', 's', 'w', 'e');