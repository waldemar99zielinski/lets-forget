import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { getOffers, GetOffersQueryDto } from 'src/api/offers/offers.api';
import { Logger } from 'src/utils/logger';

interface OffersContextInterface {
    offers: Offer[];
    refreshOffers: (query: GetOffersQueryDto) => Promise<void>;
    isLoading: boolean;
    isNoMoreOffers: boolean;
    isInitialFetch: boolean;
    getCachedOfferById: (id: string) => Offer | undefined;
}

export const OffersContext = createContext<OffersContextInterface>(null!);

export const OffersProvider = (props: PropsWithChildren<unknown>) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialFetch, setIsInitialFetch] = useState(false);
    const [isNoMoreOffers, setIsNoMoreOffers] = useState(false);
    const abortControllerRef = useRef<AbortController>(new AbortController());

    const refreshOffers = async (query: GetOffersQueryDto) => {
        try {
            setIsLoading(true);

            abortControllerRef.current = new AbortController();
            const receivedOffers = await getOffers(query, abortControllerRef.current.signal);

            console.log('after refresh')

            if(query.page && receivedOffers.length > 0) {
                Logger.debug('refresh offers: appending');

                setOffers(currentOffers => ([...currentOffers, ...receivedOffers]));
            }
            else if(query.page && receivedOffers.length === 0) {
                Logger.debug('refresh offers: no more offers');
                setIsNoMoreOffers(true);
            }
            else {
                Logger.debug('refresh offers: init');
                setOffers(receivedOffers);
            }
        } catch(error) {
            Logger.error('Refresh offers failed', error);
        } finally {
            setIsLoading(false);
            setIsInitialFetch(true);
        }
    };

    const getCachedOfferById = (id: string) => {
        return offers.find(offer => offer.id === id);
    }

    useEffect(() => {
        return () => {
            console.log('OffersProvider aborting request')
            abortControllerRef.current.abort();
        }
    }, []);

    return <OffersContext.Provider value={{
        offers,
        refreshOffers,
        isLoading,
        isNoMoreOffers,
        isInitialFetch,
        getCachedOfferById
    }}>
        {props.children}
    </OffersContext.Provider>
}