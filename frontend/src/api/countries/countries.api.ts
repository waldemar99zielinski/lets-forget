import axios, { GenericAbortSignal } from 'axios';

import { backendBaseV1 } from 'src/api/endpoints';

const countryUrl = backendBaseV1 + '/country';

export const getCountries = async (signal?: GenericAbortSignal) => {
    const response = await axios.get<Country[]>(countryUrl, {signal});

    return response.data;
}