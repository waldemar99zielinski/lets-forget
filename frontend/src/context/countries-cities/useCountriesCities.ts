import { useContext } from 'react';
import { ContriesCitiesContext } from './CountriesCitiesProvider';

export const useContriesCities = () => {
    const context = useContext(ContriesCitiesContext);

    if(!context)
        throw new Error('useContriesCities is used outside of its provider');

    return context;
}