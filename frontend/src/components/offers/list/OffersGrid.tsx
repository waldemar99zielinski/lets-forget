import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useOffers } from 'src/context/offers/useOffers';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { NotFound } from 'src/components/not-found/NotFound';
import { useIsVisible } from 'src/hooks/useIsVisible';
import { CenteredViewLimitedWidth } from 'src/components/pages/CenteredViewLimitedWidth';

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

interface OffersGridProps {
    offers: Offer[];
    isNoMoreOffers: boolean;
    isLoading: boolean;
    nextPage: () => void | Promise<void>;
}

export const OffersGrid = (props: OffersGridProps) => {
    // const {isLoading: isOffersLoading, isNoMoreOffers, offers, refreshOffers} = useOffers();
    const [isLoadingVisible, loadingRef] = useIsVisible();
    const containerRef = useRef<HTMLDivElement>(null);
    const {state} = useLocation();

    useEffect(() => {
        if(state && state.listScrollY)
            containerRef.current?.scrollTo({top: state.listScrollY})
    }, [state]);

    // pagination
    useEffect(() => {
        if(isLoadingVisible && !props.isLoading) {
            props.nextPage();
        }
    }, [isLoadingVisible, props.isLoading, props.nextPage]);

    if(!props.offers.length && !props.isLoading)
        return <CenteredViewLimitedWidth>
            <NotFound />
        </CenteredViewLimitedWidth>;

    return <GridContainer ref={containerRef}>
        {props.offers.map((offer) => {
            return <OfferCard key={offer.id} offer={offer} parentContainerRef={containerRef} />;
        })}
        {!props.isNoMoreOffers && <CircleLoading 
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