import { PropsWithChildren } from 'react';

import { ContriesCitiesProvider } from 'src/context/countries-cities/CountriesCitiesProvider';
import { GlobalContextProvider } from 'src/context/global/GlobalContextProvider';
import { PlacesProvider } from 'src/context/places/PlacesProvider';
import { OffersProvider } from 'src/context/offers/OffersProvider';

export const WorkspaceProvider = (props: PropsWithChildren<unknown>) => {
    return <GlobalContextProvider>
        <ContriesCitiesProvider>
            <PlacesProvider>
                <OffersProvider>
                        {props.children}
                </OffersProvider>
            </PlacesProvider>
        </ContriesCitiesProvider>
    </GlobalContextProvider>;
}