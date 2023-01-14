import * as Joi from 'joi';

export const latitudeSchema = Joi
    .number()
    .min(-90)
    .max(90)
    .precision(6);

export const longitudeSchema = Joi
    .number()
    .min(-180)
    .max(180)
    .precision(6);