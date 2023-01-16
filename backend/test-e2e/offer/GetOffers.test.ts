import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { Offer } from '../../src/database/entities/offer/offer.entity';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestOffer } from '@lets-forget/backend/utils/modules-interaction/offer.api';
import { createTestPlace } from '@lets-forget/backend/utils/modules-interaction/place.api';
import { createOfferType } from '../../utils/modules-interaction/offert-type.database';

const offerUrl = baseUrlV1 + '/offer';

describe(`Get offer by query GET - ${offerUrl}/?`, () => {

    it('should get offers by place id', async () => {
        const place = await createTestPlace({});

        const offer1 = await createTestOffer({placeId: place.id});
        const offer2 = await createTestOffer({placeId: place.id});

        return request(offerUrl)
            .get(`?place-id=${place.id}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const receivedOffers: Offer[] = respose.body;

                expect(receivedOffers.length).toBe(2);
            });
    });

    it('should get offers by offer type and city', async () => {
        const cityId = faker.datatype.uuid();
        const place = await createTestPlace({cityId});
        const offerTypeName = faker.datatype.uuid();
        const offerType = await createOfferType({name: offerTypeName});
        const offerType2 = await createOfferType({});

        const date = new Date('2023-01-16T20:46:35.733Z');

        const offer1 = await createTestOffer({placeId: place.id, offerTypeId: offerType, date});
        const offer2 = await createTestOffer({placeId: place.id, offerTypeId: offerType, date});
        await createTestOffer({placeId: place.id, offerTypeId: offerType2});

        return request(offerUrl)
            .get(`?type=${offerType}&date=${date}&city=${cityId}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const receivedOffers: Offer[] = respose.body;

                expect(receivedOffers.length).toBe(2);

                expect([receivedOffers[0].id, receivedOffers[1].id]).toContain(offer1.id)
                expect([receivedOffers[0].id, receivedOffers[1].id]).toContain(offer2.id)
            });
    });
});