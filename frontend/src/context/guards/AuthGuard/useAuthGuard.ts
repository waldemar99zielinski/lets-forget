import { useContext } from 'react';

import { AuthGuardContext } from './AuthGuardProvider';

export const useAuthGuard = () => {
    const context = useContext(AuthGuardContext);

    if(!context)
        throw new Error('Can not useAuthGuard outside of its provider');

    return context;
}; 