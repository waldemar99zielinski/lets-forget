import { faker } from '@faker-js/faker';
import axios from 'axios';
import { addHours, subHours } from 'date-fns';

import { PostOfferRequestDto } from '@lets-forget/backend/src/modules/offer/dto/PostOfferRequest.dto';
import { PostPlaceRequestDto } from '../../src/modules/place/dto/PostPlaceRequest.dto';
import { Offer, Currency, DaysOfTheWeek } from '../../src/database/entities/offer/offer.entity';

import { baseUrlV1 } from '../config/url';
import { createTestPlace } from './place.api';
import { createActivatedUserWithToken } from './auth.api';
import { createOfferType } from './offert-type.database';

import { getHoursFormat } from '@lets-forget/backend/src/utils/time/getHourFormat';

const offerUrl = baseUrlV1 + '/offer';

interface CreateOfferProps {
    offerProps?: Partial<Omit<PostOfferRequestDto, 'placeId' | 'authorId'>>;
    date?: Date,
    placeId?: string;
    offerTypeId?: string;
    place?: Partial<PostPlaceRequestDto>
}

export const createTestOffer = async (props: CreateOfferProps) => {
    const mockPlaceId = props.placeId || (await createTestPlace(props.place || {})).id;
    const mockUser = await createActivatedUserWithToken({});
    const mockOfferType = props.offerTypeId || (await createOfferType({}));

    const daysOfTheWeekRecord: Record<number, DaysOfTheWeek> = {};

    for(let i = 0; i < 5; i++) {
        const n = Number(faker.random.numeric())%7;

        daysOfTheWeekRecord[n] = DaysOfTheWeek[Object.keys(DaysOfTheWeek)[n]];
    }


    if(props.date)
        daysOfTheWeekRecord[props.date.getDay()] =  DaysOfTheWeek[Object.keys(DaysOfTheWeek)[props.date.getDay()]];

    const daysOfTheWeek = Object.values(daysOfTheWeekRecord);

    const mockOffer: Omit<Offer, 'id' | 'authorId' | 'createdAt' | 'updatedAt'> = {
        placeId: mockPlaceId,
        typeId: mockOfferType,

        title: faker.lorem.words(6).slice(0, 60),
        description: faker.lorem.words(12),
        
        price: Number(faker.random.numeric(Number(faker.random.numeric())%2)),
        currency: Currency.PLN,

        startsAt: faker.date.past(1, props.date),
        endsAt: faker.date.soon(10, props.date),

        daysOfTheWeek: Object.values(daysOfTheWeek),

        startTime: props.date ? getHoursFormat(subHours(props.date, 2)) : getHoursFormat(),
        endTime:  props.date ? getHoursFormat(addHours(props.date, 2)) : getHoursFormat(),
        ...props.offerProps
    }

    const response = await axios.post(offerUrl, mockOffer, {
        headers: {Authorization: `Bearer ${mockUser.token}`}
    });

    return {...mockOffer, id: response.data.id, authorId: mockUser.user.id};
}