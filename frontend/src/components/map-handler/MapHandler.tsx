import { forwardRef, Ref, useMemo, useState } from 'react';

import { Map } from 'src/components/map/Map';
import { useOffers } from 'src/context/offers/useOffers';
import { usePlaces } from 'src/context/places/usePlaces';
import { useSearch } from 'src/context/search/useSearch';
import { MapDrawerMobile } from 'src/components/drawer/mapDrawer/MapDrawerMobile';

import { barMarkerProps } from './customMarkers';
import { beerMarkerProps } from './customMarkers';
import { groupOffersByPlace } from './utils';

export const MapHandler = forwardRef((_props: any, ref: Ref<L.Map>) => {
    const {offers} = useOffers();
    const {places} = usePlaces();
    const {searchMode} = useSearch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const markers = useMemo(() => {
        if(searchMode === 'place') {
            return places.map((place) => barMarkerProps({
                latitude: place.latitude,
                longitude: place.longitude,
                name: place.name
            }));
        } else if(searchMode === 'offer') {
             //TODO distinguish map markers for offers
            return groupOffersByPlace(offers).map((offersByPlace) => beerMarkerProps({
                latitude: offersByPlace.place.latitude,
                longitude: offersByPlace.place.longitude,
                badge: offersByPlace.count > 9 ? '9+' : offersByPlace.count,
                onClick: () => setIsDrawerOpen(true)
            }));
        }

        return [];
    }, [offers, places, searchMode]);
    return <>
        <Map ref={ref} markers={markers}/>
        {isDrawerOpen && <MapDrawerMobile />}
    </>;
});