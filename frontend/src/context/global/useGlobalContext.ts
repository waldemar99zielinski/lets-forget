import { useContext } from 'react';
import { GlobalContext } from './GlobalContextProvider';

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if(!context) {
        throw new Error('useGlobalContext is used outside of its context');
    }

    return context;
};