import * as Joi from 'joi';

export interface GetOfferSchedulesQueryDto {
    offerId: string;
}

export const GetOffersQuerySchema = Joi.object<GetOfferSchedulesQueryDto>({
    offerId: Joi.string().uuid({version: 'uuidv4'}).required(),
})
    .rename('offer-id', 'offerId');