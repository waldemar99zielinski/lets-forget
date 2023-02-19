import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useOffers } from 'src/context/offers/useOffers';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { NotFound } from 'src/components/not-found/NotFound';
import { useIsVisible } from 'src/hooks/useIsVisible';

import { OfferCard } from './OfferCard';

const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;

    --auto-grid-min-size: 16rem;
    display: grid;
    grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
    );
    grid-gap: 1rem;

    overflow: auto;
`;

export const OffersGrid = () => {
    const {isLoading: isOffersLoading, isInitialFetch, isNoMoreOffers, offers, refreshOffers} = useOffers();
    const [isLoadingVisible, loadingRef] = useIsVisible();
    const containerRef = useRef<HTMLDivElement>(null);
    const {state} = useLocation();

    console.log('offers grid location state', state);

    useEffect(() => {
        if(state && state.listScrollY)
            containerRef.current?.scrollTo({top: state.listScrollY})
    }, [state]);

    console.log('isLoadingVisible', isLoadingVisible);

    // console.log(offers)
    useEffect(() => {
        if (!isInitialFetch) {
            refreshOffers({
                date: new Date(),
                city: 'Warsaw',
                // page: isLoadingVisible === true
            });
        }
     
    }, []);

    useEffect(() => {
        if(isLoadingVisible && !isOffersLoading) {
            console.log('last item', offers.at(-1));
            refreshOffers({
                date: new Date(),
                city: 'Warsaw',
                page: offers.at(-1)?.id
            });
        }
    }, [isLoadingVisible, isOffersLoading]);

    // setInterval(() => console.log("offers grid ref", containerRef.current?.scrollTop), 10000)

    // TODO write a wrapper to size it properly bo teraz jest na caly ekran
    if(!offers.length)
        return <NotFound />;

    return <GridContainer ref={containerRef}>
        {offers.map((offer) => {
            return <OfferCard key={offer.id} offer={offer} parentContainerRef={containerRef} />;
        })}
        {!isNoMoreOffers && <CircleLoading 
            containerProps={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '150px'
            }} 
            ref={loadingRef}
        />}
    </GridContainer>;
};