import * as Joi from 'joi';

export type ResourceType = 'place' | 'offer'

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