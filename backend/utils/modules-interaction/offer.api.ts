import { faker } from '@faker-js/faker';
import axios from 'axios';

import { PostOfferRequestDto } from '@lets-forget/backend/src/modules/offer/dto/PostOfferRequest.dto';
import { PostPlaceRequestDto } from '../../src/modules/place/dto/PostPlaceRequest.dto';
import { Offer, Currency } from '../../src/database/entities/offer/offer.entity';

import { baseUrlV1 } from '../config/url';
import { createTestPlace } from './place.api';
import { createActivatedUserWithToken } from './auth.api';
import { createOfferType } from './offert-type.database';

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

    const mockOffer: Omit<Offer, 'id' | 'authorId' | 'createdAt' | 'updatedAt'> = {
        placeId: mockPlaceId,
        typeId: mockOfferType,

        title: faker.lorem.words(6).slice(0, 60),
        description: faker.lorem.words(12),
        
        price: Number(faker.random.numeric(Number(faker.random.numeric())%2)),
        currency: Currency.PLN,

        startsAt: faker.date.past(1, props.date),
        endsAt: faker.date.soon(10, props.date),
        ...props.offerProps
    }

    const response = await axios.post(offerUrl, mockOffer, {
        headers: {Authorization: `Bearer ${mockUser.token}`}
    });

    return {offer: {...mockOffer, id: response.data.id, authorId: mockUser.user.id}, token: mockUser.token};
}