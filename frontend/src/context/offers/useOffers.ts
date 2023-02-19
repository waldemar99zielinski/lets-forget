import { useContext } from 'react';
import { OffersContext } from './OffersProvider';

export const useOffers = () => {
    const context = useContext(OffersContext);

    if(!context)
        throw new Error('useOffers is used outside of its provider');

    return context;
}