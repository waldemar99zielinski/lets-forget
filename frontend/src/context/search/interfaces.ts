export type LocationOption = 'userLocation' | 'mapLocation';

export interface SetPlaceSearchQueryParams {
    name?: string;
    street?: string;
    location?: LocationOption; 
}