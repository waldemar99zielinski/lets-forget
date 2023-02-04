import { faker } from '@faker-js/faker';
import {subHours, addHours} from 'date-fns';
import axios from 'axios';

import { DaysOfTheWeek } from '../../src/database/entities/offer-schedule/offerSchedule.entity';
import { PostOfferScheduleRequestDto } from '../../src/modules/offer-schedule/dto/PostOfferScheduleRequest.dto';

import { baseUrlV1 } from '../config/url';

const offerScheduleUrl = baseUrlV1 + '/offer-schedule';

interface CreateTestOfferScheduleProps {
    offerScheduleProps?: Partial<PostOfferScheduleRequestDto>;
    offerId: string;
    token: string;
    numberOfSchedulesToCreate?: number;
}

export const createTestOfferSchedule = async (props: CreateTestOfferScheduleProps) => {
    const {numberOfSchedulesToCreate = 1} = props;

    let daysOfTheWeekArray = Object.values(DaysOfTheWeek) as DaysOfTheWeek[];

    const create = async () => {
        for(let i = 0; i < numberOfSchedulesToCreate; i++) {

            const selectedDay = daysOfTheWeekArray[Number(faker.random.numeric())%7];

            daysOfTheWeekArray = daysOfTheWeekArray.filter(day => day !== selectedDay);

            const startTime = subHours(faker.date.soon(), Number(faker.random.numeric())%5).toISOString().slice(11, 19);
            const endTime = addHours(faker.date.soon(), (Number(faker.random.numeric())%5) + 1).toISOString().slice(11, 19);

            const body: PostOfferScheduleRequestDto = {
                offerId: props.offerId,
                dayOfTheWeek: selectedDay,
                startTime,
                endTime: endTime > startTime ? endTime : '23:59:59'
            };

            await axios.post(offerScheduleUrl, body, {
                headers: {Authorization: `Bearer ${props.token}`}
            });
        }
    }
    await create();
}