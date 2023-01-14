import axios from 'axios';

import {OfferType} from '../../src/database/entities/offer-type/offer-type.entity';

import { baseUrlV1 } from '../config/url';

const offerTypeUrl = baseUrlV1 + '/offer-types';

export const getOfferTypes = async () => {
    const respose =  await axios.get<OfferType[]>(offerTypeUrl);
    return respose.data;
};