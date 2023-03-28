import { StandardOfferTypes } from "src/types/OfferType";

export type LocationOption = 'userLocation' | 'mapLocation';

export interface SetPlaceSearchQueryParams {
    name?: string;
    street?: string;
    location?: LocationOption; 
}

export interface SetOfferSearchQueryParams {
    name?: string;
    offerType?: StandardOfferTypes;
    maxPrice?: number;
}