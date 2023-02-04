import * as Joi from 'joi';

import { DaysOfTheWeek } from 'src/database/entities/offer-schedule/offerSchedule.entity';
import { hourSchema } from 'src/common/validation/hour';

export interface PostOfferScheduleRequestDto {
    offerId: string;
    dayOfTheWeek: DaysOfTheWeek,
    startTime: string;
    endTime: string;
}

export const PostOfferScheduleRequestSchema = Joi.object<PostOfferScheduleRequestDto>({
    offerId: Joi.string()
        .guid({
            version: ['uuidv4']
        })
        .required(),

    dayOfTheWeek: Joi.string()
        .valid(...Object.keys(DaysOfTheWeek))
        .required(),

    startTime: hourSchema.required(),
    endTime: hourSchema.required()
})
    .custom((object) => {
        const {startTime, endTime} = object;

        if(endTime <= startTime)
            throw new Error('startTime can has to be greater than endTime');

        return object;
    });
