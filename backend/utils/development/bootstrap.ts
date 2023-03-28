import { faker } from '@faker-js/faker';

import { Place } from '../../src/database/entities/place/place.entity';
import { OfferType } from '../../src/database/entities/offer-type/offer-type.entity';
import { Offer } from '../../src/database/entities/offer/offer.entity';

import { initializeTestCities } from '../modules-interaction/city.database';
import { createTestPlace } from '../modules-interaction/place.api';
import { createTestOffer } from '../modules-interaction/offer.api';
import { createOfferType } from '../modules-interaction/offert-type.database';
import { createTestOfferSchedule } from '../modules-interaction/offer-schedule.api';
import { createTestUser } from '../modules-interaction/auth.api';
import { truncateCountriesTable } from '../modules-interaction/country.database';
import { activateUserEmail } from '../modules-interaction/auth.databse';

import { places } from './places.data';
import { userData } from './users.data';
import { offerTypeData } from './offer-types.data';

const NUMBER_OF_OFFERS = 500;

const bootstrap = async () => {
    const createdPlaces: Place[] = [];
    const createdOfferTypes: OfferType[] = [];
    const createdOffers: {offer: Omit<Offer, 'createdAt' | 'updatedAt'>, token: string}[] = [];

    console.log('Truncating database');
    await truncateCountriesTable();

    console.log('Creating cities');
    await initializeTestCities();
    console.log('Cities created');
    console.log('Creating places');
    const createPlaces = async () => {
        for(const place of places) {
            const createdPlace = await createTestPlace(place);
            createdPlaces.push(createdPlace);
        }
    };
    await createPlaces();
    console.log('Places created');

    console.log('Creating offer types');
    const createOfferTypes = async () => {
        for(const offerType of offerTypeData) {
            await createOfferType({name: offerType.id});
            createdOfferTypes.push(offerType);
        }
    }
    await createOfferTypes();
    console.log('Offer types created');

    console.log('Creating offers');
    const createOffers = async () => {
        for(let i = 0; i < NUMBER_OF_OFFERS; i++) {
            const placeId = createdPlaces[Number(faker.random.numeric())%createdPlaces.length].id;
            const offerType = createdOfferTypes[Number(faker.random.numeric())%createdOfferTypes.length].id;

            if(i%2 === 0) {
                const offer = await createTestOffer({placeId, date: new Date(), offerTypeId: offerType})
                createdOffers.push(offer);
            }
            else {
                const offer = await createTestOffer({placeId, offerTypeId: offerType});
                createdOffers.push(offer);
            }
        }
    }
    await createOffers();
    console.log('Offers created');

    console.log('Creating offers schedules');
    const createOffersSchedules = async () => {

        for(let i = 0; i < NUMBER_OF_OFFERS / 2; i++) {
            const random = Math.floor(Math.random() * createdOffers.length);

            const offer = createdOffers[random];

            await createTestOfferSchedule({offerId: offer.offer.id, token: offer.token, numberOfSchedulesToCreate: 3});
        }
    }
    await createOffersSchedules();
    console.log('Offers schedules created');

    console.log('Creating users');
    const createUsers = async () => {
        for(const user of userData) {
            await createTestUser(user);

            await activateUserEmail({email: user.email});
        }
    };
    await createUsers();
    console.log('Users created');
}

void bootstrap();