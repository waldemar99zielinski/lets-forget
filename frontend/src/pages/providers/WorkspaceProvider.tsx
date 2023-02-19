import { PropsWithChildren } from 'react';

import { PlacesProvider } from 'src/context/places/PlacesProvider';
import { OffersProvider } from 'src/context/offers/OffersProvider';

export const WorkspaceProvider = (props: PropsWithChildren<unknown>) => {
    return <PlacesProvider>
        <OffersProvider>
            {props.children}
        </OffersProvider>
    </PlacesProvider>;
}