import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { getPlaces, GetPlacesRequestQuery } from 'src/api/places/places.api';

import { Logger } from 'src/utils/logger';

interface PlaceContextInterface {
    places: Place[],
    refreshPlaces: (query: GetPlacesRequestQuery) => Promise<void>;
    isLoading: boolean;
}

export const PlacesContext = createContext<PlaceContextInterface>(null!);

export const PlacesProvider = (props: PropsWithChildren<unknown>) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [abortController, setAbortController] = useState(new AbortController());

    const refreshPlaces = async (query: GetPlacesRequestQuery) => {
        try {
            setIsLoading(true);

            const recevicedPlaces = await getPlaces(query);

            setPlaces(recevicedPlaces);
        } catch(error) {
            Logger.error('Refresh places failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => abortController.abort();
    }, []);

    return <PlacesContext.Provider value={{
        places,
        refreshPlaces,
        isLoading
    }}>
        {props.children}
    </PlacesContext.Provider>;
};