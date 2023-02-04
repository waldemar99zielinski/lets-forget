import * as Joi from 'joi';

import { Currency } from 'src/database/entities/offer/offer.entity';
import { hourSchema } from 'src/common/validation/hour';

export interface PostOfferRequestDto {
    placeId: string;
    typeId: string;

    title: string;
    description?: string;

    price?: number,
    currency?: Currency,

    startsAt?: Date,
    endsAt?: Date
}

export const PostOfferRequestSchema = Joi.object<PostOfferRequestDto>({
    placeId: Joi.string()
        .guid({
            version: ['uuidv4']
        })
        .required(),
    typeId: Joi.string().required(),
    
    title: Joi.string().min(1).max(60).required(),
    description: Joi.string().min(1).max(256),
    
    price: Joi.number().min(0).integer(),
    currency: Joi.string().valid(...Object.values(Currency)),

    startsAt: Joi.date(),
    endsAt: Joi.date(),
})
    .and('price', 'currency');