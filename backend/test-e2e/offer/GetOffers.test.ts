import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import { baseUrlV1 } from '../../utils/config/url';
import { createTestOffer } from '@lets-forget/backend/utils/modules-interaction/offer.api';

const offerUrl = baseUrlV1 + '/offer';

describe(`Get offer by query GET - ${offerUrl}/?`, () => {

    it('')
});