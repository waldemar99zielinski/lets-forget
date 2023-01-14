import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestOffer } from '@lets-forget/backend/utils/modules-interaction/offer.api';

const offerUrl = baseUrlV1 + '/offer';

describe(`Get offer by id GET - ${offerUrl}/:id`, () => {

    it('should get offer by id', async () => {
        const offer = await createTestOffer({});

        return request(offerUrl)
            .get(`/${offer.id}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const receivedOffer = respose.body;

                expect(receivedOffer).toEqual(
                    expect.objectContaining({
                        ...offer,
                        price: offer.price?.toString(),
                        startsAt: (offer.startsAt as unknown as Date).toISOString(),
                        endsAt: (offer.endsAt as unknown as Date).toISOString(),
                    })
                );

                expect(new Date(receivedOffer.createdAt)).toBeInstanceOf(Date);
                expect(new Date(receivedOffer.updatedAt)).toBeInstanceOf(Date);
            });
    });

    it('should fail if id is not uuid', async () => {
        return request(offerUrl)
            .get(`/not-uuid`)
            .expect(400)
    });

    it('should fail if id is not present in db', async () => {
        return request(offerUrl)
            .get(`/${faker.datatype.uuid()}`)
            .expect(404)
    });
});
