import { useContext } from 'react';

import { AuthContext } from './AuthProvider';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context)
        throw new Error('Can not useAuth outside of its provider');

    return context;
}; 