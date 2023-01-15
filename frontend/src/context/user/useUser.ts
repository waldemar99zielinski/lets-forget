import { useContext } from 'react';

import { UserContext } from './UserProvider';

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context)
        throw new Error('Can not useUser outside of its provider');

    return context;
}; 