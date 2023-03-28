import { CenteredView } from 'src/components/pages/CenteredView';
import { OffersGrid } from 'src/components/offers/list/OffersGrid';
import { SearchProvider } from 'src/context/search/SearchProvider';

import { useGeolocation } from 'src/hooks/useGeolocation';
import { useLoadScript } from 'src/hooks/useLoadScript';

export const RootPage = () => {
    // useLoadScript({src: "https://cdn.jsdelivr.net/npm/eruda"}, () => {eruda.init()});
    return <SearchProvider>
        <CenteredView container={{
            flexDirection: 'column'
        }}>
            <OffersGrid />
        </CenteredView>
    </SearchProvider> ;
};