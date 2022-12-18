import { useCallback, useContext } from 'react';

import { AlertContext, OpenAlertProps } from './AlertProvider';

export const useAlert = (props: OpenAlertProps) => {
    const context = useContext(AlertContext);

    if(!context)
        throw new Error('Can not use useAlert outside of its provider');

    return context.useOpenAlerts(props);
}