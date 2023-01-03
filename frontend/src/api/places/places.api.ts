import axios, { GenericAbortSignal } from 'axios';

import { backendBaseV1 } from 'src/api/endpoints';

const placeUrl = backendBaseV1 + '/place';

export interface GetPlacesRequestQuery {
    city?: string;
    name?: string;
    street?: string;
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude
}

export const getPlaces = async (query: GetPlacesRequestQuery, signal?: GenericAbortSignal) => {
    const response = await axios.get<Place[]>(placeUrl, {params: query, signal});

    return response.data;
}