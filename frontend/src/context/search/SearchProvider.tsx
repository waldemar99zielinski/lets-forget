import * as L from 'leaflet';
import { createContext, PropsWithChildren, useEffect, useState, RefObject } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchDialog } from 'src/components/search/dialog/SearchMapDialog';
import { usePlaces } from 'src/context/places/usePlaces';

import { GetPlacesQuery, GetPlacesQuerySchema, GetResourceQuerySchema, ResourceType } from './SearchQueryValidation';
import { SetPlaceSearchQueryParams } from './interfaces';

interface SearchContextInterface {
    openDialog: () => void;
    setPlaceSearchQuery: (query: SetPlaceSearchQueryParams) => void;
    searchMode: ResourceType | undefined;
}

export const SearchContext = createContext<SearchContextInterface>(null!);

interface SearchProviderProps {
    mapRef?: RefObject<L.Map>;
}

export const SearchProvider = (props: PropsWithChildren<SearchProviderProps>) => {
    const [isSearchParamsDialogOpen, setIsSearchParamsDialogOpen] = useState(false);
    const [searchMode, setSearchMode] = useState<ResourceType>();
    const {refreshPlaces} = usePlaces();
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

    }, [searchParams]);

    const setPlaceSearchQuery = (params: SetPlaceSearchQueryParams) => {
        const searchParams = new URLSearchParams();
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

    return <SearchContext.Provider value={{
        openDialog: () => setIsSearchParamsDialogOpen(true),
        setPlaceSearchQuery,
        searchMode
    }}>
        {props.children}
        <SearchDialog 
            open={isSearchParamsDialogOpen}
            onClose={() => setIsSearchParamsDialogOpen(false)}
        />
    </SearchContext.Provider>
}