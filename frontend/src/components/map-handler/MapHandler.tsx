import { forwardRef, Ref, useMemo } from 'react';

import { Map } from 'src/components/map/Map';
import { usePlaces } from 'src/context/places/usePlaces';
import { useSearch } from 'src/context/search/useSearch';

import { barMarkerProps } from './customMarkers';

const PopupContent = (name: string) => {
    return <div>{name}</div>
}

export const MapHandler = forwardRef((_props: any, ref: Ref<L.Map>) => {
    const {places} = usePlaces();
    const {searchMode} = useSearch();

    const markers = useMemo(() => {
        if(searchMode === 'place') {
            return places.map((place) => barMarkerProps({
                latitude: place.latitude,
                longitude: place.longitude,
                name: place.name
            }))
        }
        
        return [];
    }, [places, searchMode]);

    return <Map ref={ref} markers={markers}/>;
});