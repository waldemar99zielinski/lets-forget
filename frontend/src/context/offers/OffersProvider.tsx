import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { getOffers, GetOffersQueryDto } from 'src/api/offers/offers.api';
import { Logger } from 'src/utils/logger';

interface OffersContextInterface {
    offers: Offer[];
    refreshOffers: (query?: GetOffersQueryDto, mode?: QueryMode) => Promise<void>;
    isLoading: boolean;
    isNoMoreOffers: boolean;
    isInitialFetch: boolean;
    getCachedOfferById: (id: string) => Offer | undefined;
}

type QueryMode = 'override' | 'append';

export const OffersContext = createContext<OffersContextInterface>(null!);

export const OffersProvider = (props: PropsWithChildren<unknown>) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialFetch, setIsInitialFetch] = useState(false);
    const [isNoMoreOffers, setIsNoMoreOffers] = useState(false);
    const queryMemoRef = useRef<GetOffersQueryDto | undefined>();
    const abortControllerRef = useRef<AbortController>(new AbortController());

    const refreshOffers = async (query?: GetOffersQueryDto, mode: QueryMode = 'override') => {
        try {
            setIsLoading(true);

            if(query && mode === 'override')
                queryMemoRef.current = query;
            else if(query && mode === 'append')
                queryMemoRef.current = queryMemoRef ? {...queryMemoRef.current, ...query} : query;

            if(!queryMemoRef.current)
                throw new Error('refreshOffers query not provided and not found in memory');
            
            abortControllerRef.current.abort();
            abortControllerRef.current = new AbortController();
            const receivedOffers = await getOffers(queryMemoRef.current, abortControllerRef.current.signal);

            console.log('after refresh')

            if(queryMemoRef.current.page && receivedOffers.length > 0) {
                Logger.debug('refresh offers: appending');

                setOffers(currentOffers => ([...currentOffers, ...receivedOffers]));
            }
            else if(queryMemoRef.current.page && receivedOffers.length === 0) {
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