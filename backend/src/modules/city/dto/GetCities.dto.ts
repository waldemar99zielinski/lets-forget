import * as Joi from 'joi';

export interface GetCitiesQueryDto {
    country?: string;
}

export const GetCitiesQuerySchema = Joi.object<GetCitiesQueryDto>({
    country: Joi.string()
});