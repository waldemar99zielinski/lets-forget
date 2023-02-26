import axios, { GenericAbortSignal } from 'axios';

import { backendBaseV1 } from 'src/api/endpoints';

const cityUrl = backendBaseV1 + '/city';

export interface GetCitiesRequestQuery {
    country?: string;
}

export const getCities = async (query?: GetCitiesRequestQuery, signal?: GenericAbortSignal) => {
    const response = await axios.get<City[]>(cityUrl, {params: query, signal});

    return response.data;
}