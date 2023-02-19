import axios, { GenericAbortSignal } from 'axios';

import { backendBaseV1 } from 'src/api/endpoints';

const offerUrl = backendBaseV1 + '/offer';

export interface GetOffersQueryDto {
    placeId?: string;
    type?: string;
    priceMax?: number;
    date: Date;

    //location

    city?: string,

    // coordinates of bounds
    n?: number; // latitude
    s?: number; // latitude
    w?: number; // longitude
    e?: number; // longitude

    //pagination
    page?: string;
}

export const getOffers = async (query: GetOffersQueryDto, signal?: GenericAbortSignal) => {
    const response = await axios.get<Offer[]>(offerUrl, {params: query, signal});

    return response.data;
};

export const getOfferById = async(id: string, signal?: GenericAbortSignal) => {
    const response = await axios.get<Offer>(offerUrl + `/${id}`, {signal});

    return response.data;
}