import { useContext } from 'react';
import { SearchContext } from './SearchProvider';

export const useSearch = () => {
    const context = useContext(SearchContext);

    if(!context) {
        throw new Error('useSearch is used outside of its context');
    }

    return context;
};