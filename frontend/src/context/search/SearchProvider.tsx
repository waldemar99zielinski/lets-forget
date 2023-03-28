import * as L from 'leaflet';
import { createContext, PropsWithChildren, useEffect, useState, RefObject } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchDialog } from 'src/components/search/dialog/SearchDialog';
import { usePlaces } from 'src/context/places/usePlaces';
import { useOffers } from 'src/context/offers/useOffers';
import { useGlobalContext } from 'src/context/global/useGlobalContext';
import { useUser } from 'src/context/user/useUser';

import { GetPlacesQuery, GetPlacesQuerySchema, GetResourceQuerySchema, ResourceType, GetOffersQuery, GetOffersQuerySchema } from './SearchQueryValidation';
import { SetPlaceSearchQueryParams, SetOfferSearchQueryParams } from './interfaces';

interface SearchContextInterface {
    openDialog: () => void;
    setPlaceSearchQuery: (query: SetPlaceSearchQueryParams) => void;
    setOfferSearchQuery: (query: SetOfferSearchQueryParams) => void;
    searchMode: ResourceType | undefined;
}

export const SearchContext = createContext<SearchContextInterface>(null!);

interface SearchProviderProps {
    mapRef?: RefObject<L.Map>;
}

export const SearchProvider = (props: PropsWithChildren<SearchProviderProps>) => {
    const {isSearchDialogOpened, setIsSearchDialogOpened} = useGlobalContext();
    const [searchMode, setSearchMode] = useState<ResourceType>();
    const {refreshPlaces} = usePlaces();
    const {refreshOffers} = useOffers();
    // TODO unlogged users XD
    // const {de} = useUser();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('SearchProvider params', searchParams, Object.fromEntries(searchParams));

        const {value: resourceValue, error: resourceError} 
            = GetResourceQuerySchema.validate(Object.fromEntries(searchParams));

        console.log('SearchProvider params', resourceValue, resourceError);

        if(resourceError) {
            setSearchParams();
            return;
        }

        if(resourceValue.resource === 'place') {
            const {value, error} 
                = GetPlacesQuerySchema.validate(Object.fromEntries(searchParams))
            
            console.log('SearchProvider params place', value, error);
            
            if(error) {
                setSearchParams();
                return;
            }

            setSearchMode('place');

            void refreshPlaces({
                city: value.city,
                name: value.name,
                n: value.n,
                s: value.s,
                e: value.e,
                w: value.w
            });
        }

        if(resourceValue.resource === 'offer') {
            const {value, error} 
                = GetOffersQuerySchema.validate(Object.fromEntries(searchParams))
            
            console.log('SearchProvider params offer', value, error);
            
            if(error) {
                setSearchParams();
                return;
            }

            setSearchMode('offer');

            const query = {
                ...value,
                resource: undefined
            }

            // if(!query.city || !query.placeId || !query.n) {
            //     query.city = 
            // }

            void refreshOffers(query);

            console.log('after refresh offer with query', query);
        }

    }, [searchParams]);

    const setPlaceSearchQuery = (params: SetPlaceSearchQueryParams) => {
        const queryObject = {resource: 'place'} as GetPlacesQuery;

        console.log('setPlaceSearchQuery start');

        if(params.name)
            queryObject.name = params.name;

        if(params.street)
            queryObject.street = params.street;

        console.log('setPlaceSearchQuery map ref', props.mapRef);

        if(props.mapRef && props.mapRef.current && params.location === 'mapLocation') {
            const bounds = props.mapRef.current.getBounds();

            queryObject.n = bounds.getNorth();
            queryObject.s = bounds.getSouth();
            queryObject.e = bounds.getEast();
            queryObject.w = bounds.getWest();
        }

        console.log('query object', queryObject);

        setSearchParams(new URLSearchParams(queryObject as any));
    };



    // TODO prio 100%
    const setOfferSearchQuery = (params: SetOfferSearchQueryParams) => {
        const queryObject = {resource: 'offer'} as GetOffersQuery;

        console.log('setOfferSearchParam', params);

        if(params.name)
            queryObject.name = params.name;

        if(params.offerType)
            queryObject.type = params.offerType;

        if(params.maxPrice)
            queryObject.priceMax = params.maxPrice;

        setSearchParams(new URLSearchParams(queryObject as any));
    };

    return <SearchContext.Provider value={{
        openDialog: () => setIsSearchDialogOpened(true),
        setPlaceSearchQuery,
        setOfferSearchQuery,
        searchMode,
    }}>
        {props.children}
        <SearchDialog 
            open={isSearchDialogOpened}
            onClose={() => setIsSearchDialogOpened(false)}
        />
    </SearchContext.Provider>
}