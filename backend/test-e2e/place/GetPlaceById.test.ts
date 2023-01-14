import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestPlace } from '../../utils/modules-interaction/place.api';

const placeUrl = baseUrlV1 + '/place';

describe(`Get place by id GET - ${placeUrl}/:id`, () => {

    it('should get place by id', async () => {
        const place = await createTestPlace({});

        return request(placeUrl)
            .get(`/${place.id}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const receivedPlace = respose.body;

                expect(receivedPlace).toEqual(
                    expect.objectContaining({
                        ...place,
                        latitude: Number(place.latitude).toFixed(6),
                        longitude: Number(place.longitude).toFixed(6)
                    })
                );
            });
    });

    it('should fail if id is not uuid', async () => {
        return request(placeUrl)
            .get(`/not-uuid`)
            .expect(400)
    });

    // TODO delete before test
    it('should fail if id is not present in db', async () => {
        return request(placeUrl)
            .get(`/${faker.datatype.uuid()}`)
            .expect(404)
    });
});
