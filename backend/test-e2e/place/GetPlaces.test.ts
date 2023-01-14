import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { Place } from '@lets-forget/backend/src/database/entities/place/place.entity';
import { convertKmToDegree } from '@lets-forget/backend/src/utils/coordinates/convertKmToDegree';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestPlace } from '../../utils/modules-interaction/place.api';

const placeUrl = baseUrlV1 + '/place';

describe(`Get places with query GET - ${placeUrl}?`, () => {

    it('should get place by city', async () => {
        const createdPlace = await createTestPlace({cityId: faker.address.city()});

        return request(placeUrl)
            .get(`?city=${createdPlace.cityId}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const returnedPlaces: Place[] = respose.body;

                const filteredPlace = returnedPlaces.find((place) => place.id === createdPlace.id);

                expect(filteredPlace).toEqual(
                    expect.objectContaining({
                        ...createdPlace,
                        latitude: Number(createdPlace.latitude).toFixed(6),
                        longitude: Number(createdPlace.longitude).toFixed(6)
                    })
                );
            });
    });

    it('should get place by name', async () => {
        const createdPlace = await createTestPlace({name: 'My fancy name'});

        return request(placeUrl)
            .get(`?name=My fancy`)
            .expect(200)
            .expect((respose: request.Response) => {
                const returnedPlaces: Place[] = respose.body;

                const filteredPlace = returnedPlaces.find((place) => place.id === createdPlace.id);

                expect(filteredPlace).toEqual(
                    expect.objectContaining({
                        ...createdPlace,
                        latitude: Number(createdPlace.latitude).toFixed(6),
                        longitude: Number(createdPlace.longitude).toFixed(6)
                    })
                );
            });
    });

    it('should get place by street', async () => {
        const createdPlace = await createTestPlace({street: 'My fancy street'});

        return request(placeUrl)
            .get(`?street=My fancy`)
            .expect(200)
            .expect((respose: request.Response) => {
                const returnedPlaces: Place[] = respose.body;

                const filteredPlace = returnedPlaces.find((place) => place.id === createdPlace.id);

                expect(filteredPlace).toEqual(
                    expect.objectContaining({
                        ...createdPlace,
                        latitude: Number(createdPlace.latitude).toFixed(6),
                        longitude: Number(createdPlace.longitude).toFixed(6)
                    })
                );
            });
    });

    it('should get place by coordinates radius 1km', async () => {
        const createdPlace = await createTestPlace({});

        // coordinates in 0.5 km square
        const n = createdPlace.latitude + convertKmToDegree(0.5);
        const s = createdPlace.latitude - convertKmToDegree(0.5);
        const e = createdPlace.longitude + convertKmToDegree(0.5);
        const w = createdPlace.longitude - convertKmToDegree(0.5);

        return request(placeUrl)
            .get(`?n=${n}&s=${s}&e=${e}&w=${w}`)
            .expect(200)
            .expect((respose: request.Response) => {
                const returnedPlaces: Place[] = respose.body;

                const filteredPlace = returnedPlaces.find((place) => place.id === createdPlace.id);

                expect(filteredPlace).toEqual(
                    expect.objectContaining({
                        ...createdPlace,
                        latitude: Number(createdPlace.latitude).toFixed(6),
                        longitude: Number(createdPlace.longitude).toFixed(6)
                    })
                );
            });
    });

    // it('should get place by coordinates radius 10km', async () => {
    //     const createdPlace = await createTestPlace({
    //         latitude: 
    //     });
    //     const createdPlace2 = 
    //     // coordinates in 0.5 km square
    //     const searchLatitude = createdPlace.latitude + convertKmToDegree(0.5);
    //     const searchLongitude = createdPlace.longitude + convertKmToDegree(0.5);

    //     console.log('search coords', searchLatitude, searchLongitude);

    //     return request(placeUrl)
    //         .get(`?latitude=${searchLatitude}&longitude=${searchLongitude}&radius=1`)
    //         .expect(200)
    //         .expect((respose: request.Response) => {
    //             const returnedPlaces: Place[] = respose.body;

    //             const filteredPlace = returnedPlaces.find((place) => place.id === createdPlace.id);

    //             expect(filteredPlace).toEqual(
    //                 expect.objectContaining({
    //                     ...createdPlace,
    //                     latitude: Number(createdPlace.latitude).toFixed(6),
    //                     longitude: Number(createdPlace.longitude).toFixed(6)
    //                 })
    //             );
    //         });
    // });
});
