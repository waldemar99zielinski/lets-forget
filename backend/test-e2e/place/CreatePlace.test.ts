import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { PostPlaceRequestDto } from '../../src/modules/place/dto/PostPlaceRequest.dto';

import { baseUrlV1 } from '../../utils/config/url';
import { initializeTestCity } from '../../utils/modules-interaction/city.database';

const placeUrl = baseUrlV1 + '/place';

describe(`Create place POST - ${placeUrl}`, () => {

    let city: string;
    let country: string;

    let mockPlace: PostPlaceRequestDto;

    beforeAll(async () => {
        const {cityName, countryName} = await initializeTestCity();

        city = cityName;
        country = countryName;

        mockPlace = {
            cityId: city,
            name: faker.company.name(),
            street: faker.address.street(),
            streetNumber: faker.address.buildingNumber(),
            latitude: faker.datatype.float({
                min: -90,
                max: 90,
                precision: 0.1111
            }),
            longitude: faker.datatype.float({
                min: -180,
                max: 180,
                precision: 0.1111
            })
        };
    });

    it('should create place with valid request body', () => {
        return request(placeUrl)
            .post('/')
            .send(mockPlace)
            .expect(201)
            .expect((respose: request.Response) => {
                const {id} = respose.body;

                expect(typeof id).toBe('string')
            });
    });

    it('should fail if invalid city', () => {
        return request(placeUrl)
            .post('/')
            .send({...mockPlace, cityId: 'invalid'})
            .expect(400);
    });

    it('should fail if latitude out of range - 90.123', () => {
        return request(placeUrl)
            .post('/')
            .send({...mockPlace, latitude: 90.123})
            .expect(400);
    });

    it('should fail if logitude out for range - 180.123', () => {
        return request(placeUrl)
            .post('/')
            .send({...mockPlace, longitude: 180.123})
            .expect(400);
    });


});
