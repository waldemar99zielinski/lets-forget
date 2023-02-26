import { PropsWithChildren } from 'react';

import { PlacesProvider } from 'src/context/places/PlacesProvider';
import { OffersProvider } from 'src/context/offers/OffersProvider';
import { SearchProvider } from 'src/context/search/SearchProvider';

export const WorkspaceProvider = (props: PropsWithChildren<unknown>) => {
    return <PlacesProvider>
        <OffersProvider>
            <SearchProvider>
                {props.children}
            </SearchProvider>
        </OffersProvider>
    </PlacesProvider>;
}