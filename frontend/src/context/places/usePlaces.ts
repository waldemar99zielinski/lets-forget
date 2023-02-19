import { useContext } from 'react';
import { PlacesContext } from './PlacesProvider';

export const usePlaces = () => {
    const context = useContext(PlacesContext);

    if(!context)
        throw new Error('usePlaces is used outside of its provider');

    return context;
};