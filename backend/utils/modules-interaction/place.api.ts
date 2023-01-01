import { faker } from '@faker-js/faker';
import axios from 'axios';

import { PostPlaceRequestDto } from '../../src/modules/place/dto/PostPlaceRequest.dto';
import { Place } from '../../src/database/entities/place/place.entity';

import { baseUrlV1 } from '../config/url';
import { initializeTestCity } from './city.database';

const placeUrl = baseUrlV1 + '/place';

export const createTestPlace = async (place: Partial<PostPlaceRequestDto>): Promise<Place> => {
    const {cityName} = await initializeTestCity(place.cityId);

    const mockPlace: PostPlaceRequestDto = {
        cityId: cityName,
        name: faker.company.name(),
        street: faker.address.street(),
        streetNumber: faker.address.buildingNumber(),
        latitude: faker.datatype.float({
            min: -90,
            max: 90,
            precision: 0.111111
        }),
        longitude: faker.datatype.float({
            min: -180,
            max: 180,
            precision: 0.111111
        }),
        ...place
    };

    const respose = await axios.post(placeUrl, mockPlace);

    return {...mockPlace, id: respose.data.id};
};