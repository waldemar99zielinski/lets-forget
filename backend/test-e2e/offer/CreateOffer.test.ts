import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { PostOfferRequestDto } from '@lets-forget/backend/src/modules/offer/dto/PostOfferRequest.dto';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestPlace } from '@lets-forget/backend/utils/modules-interaction/place.api';
import { createActivatedUserWithToken } from '@lets-forget/backend/utils/modules-interaction/auth.api';
import { createOfferType } from '@lets-forget/backend/utils/modules-interaction/offert-type.database';

const offerUrl = baseUrlV1 + '/offer';

describe(`Create offer POST - ${offerUrl}`, () => {
    let testPlace;
    let testUser;
    let testOfferType;

    let mockOfferRequest: PostOfferRequestDto;

    beforeAll(async () => {
        testPlace = await createTestPlace({});
        testUser = await createActivatedUserWithToken({});
        testOfferType = await createOfferType({});

        mockOfferRequest = {
            placeId: testPlace.id,
            typeId: testOfferType,
            title: faker.commerce.productName(),
            description: faker.datatype.string(100),
        }
    });

    it('should create offer with valid body', () => {
        return request(offerUrl)
            .post('/')
            .send(mockOfferRequest)
            .set({Authorization: `Bearer ${testUser.token}`})
            .expect(201)
            .expect((response: request.Response) => {
                const {id} = response.body;

                expect(typeof id).toBe('string');
            });
    });

    it('should create offer with specified days of the week', () => {
        return request(offerUrl)
            .post('/')
            .send({
                ...mockOfferRequest,
                daysOfTheWeek: ['monday', 'friday']
            })
            .set({Authorization: `Bearer ${testUser.token}`})
            .expect(201)
            .expect((response: request.Response) => {
                const {id} = response.body;

                expect(typeof id).toBe('string');
            });
    });

    it('should fail with 403 if auth token is not provided', () => {
        return request(offerUrl)
            .post('/')
            .send(mockOfferRequest)
            .expect(403);
    });

    it('should fail if place does not exist', () => {
        return request(offerUrl)
            .post('/')
            .send({
                ...mockOfferRequest,
                placeId: faker.datatype.uuid()
            })
            .set({Authorization: `Bearer ${testUser.token}`})
            .expect(400);
    });
});