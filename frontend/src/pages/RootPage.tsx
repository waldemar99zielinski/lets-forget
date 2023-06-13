import { CenteredView } from 'src/components/pages/CenteredView';
import { OffersGrid } from 'src/components/offers/list/OffersGrid';
import { SearchProvider } from 'src/context/search/SearchProvider';

import { useGeolocation } from 'src/hooks/useGeolocation';
import { useLoadScript } from 'src/hooks/useLoadScript';
import { useOffers } from 'src/context/offers/useOffers';

export const RootPage = () => {
    // useLoadScript({src: "https://cdn.jsdelivr.net/npm/eruda"}, () => {eruda.init()});

    const {offers, isNoMoreOffers, isLoading, offersNextPage} = useOffers();

    return <SearchProvider>
        <CenteredView container={{
            flexDirection: 'column'
        }}>
            <OffersGrid offers={offers} isNoMoreOffers={isNoMoreOffers} isLoading={isLoading} nextPage={offersNextPage}/>
        </CenteredView>
    </SearchProvider> ;
};