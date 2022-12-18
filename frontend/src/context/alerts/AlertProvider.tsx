import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AlertProps } from '@mui/material/Alert';
import zIndex from '@mui/material/styles/zIndex';
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { useIsMobile } from 'src/hooks/useIsMobile';

interface StoredAlertProps {
    type: AlertProps['severity'];
    text: string;
    manuallyClosable: boolean;
    timeoutId?: ReturnType<typeof setTimeout>;
}

export interface OpenAlertProps {
    text: string;
    type?: AlertProps['severity'];
    closeAfter?: number;
    manuallyClosable?: boolean
}

interface AlertContextInterface {
    useOpenAlerts: (props: OpenAlertProps) => (() => void)[];
}

export const AlertContext = createContext<AlertContextInterface>(null!);

export const AlertProvider = (props: PropsWithChildren<unknown>) => {
    const isMobile = useIsMobile();

    const [alerts, setAlerts] = useState<Map<string, StoredAlertProps>>(new Map());

    const close = (alertId: string) => {
        setAlerts(currentAlerts => {
            const updatedMap = new Map(currentAlerts);
            updatedMap.delete(alertId);
            return updatedMap;
        });
    };
    
    const alertStyle = isMobile 
        ? {width: '100vw'}
        : {minWidth: '400px'}

    const useOpenAlerts = useCallback((
        {
            text,
            type = 'info',
            closeAfter,
            manuallyClosable = false
        }: OpenAlertProps
    ) => {
        const alertId = useMemo(() => window.crypto.randomUUID(), []);

        const open = () => {
            let tempTimeoutId: ReturnType<typeof setTimeout> | undefined;

            if(closeAfter)
                tempTimeoutId = setTimeout(() => close(alertId), closeAfter);

            setAlerts(currentAlerts => new Map(
                currentAlerts.set(alertId, {
                    text,
                    type,
                    manuallyClosable,
                    timeoutId: tempTimeoutId
                }),
            ));
        };

        return [open, () => close(alertId)];
    }, [setAlerts]);

    return <AlertContext.Provider value={{
        useOpenAlerts
    }}>
        {props.children}
        <Stack
            spacing={1}
            sx={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translate(-50%, 0)',
                zIndex: zIndex.snackbar,
                [`& .MuiAlert-action`]: {padding: 0},
                [`& .MuiAlert-standardSuccess`]: {background: 'rgb(158, 210, 163)'},
                [`& .MuiAlert-standardError`]: {background: 'rgb(185, 79, 89)'},
                [`& .MuiAlert-standardWarning`]: {background: 'rgb(210, 149, 67)'},
                [`& .MuiAlert-standardInfo`]: {background: 'rgb(63, 143, 176)'} 
            }}
        >
            {Array.from(alerts, ([key, alert]) => (<Alert 
                    key={key}
                    severity={alert.type}
                    action={
                        alert.manuallyClosable
                        ? <Button onClick={() => close(key)}>
                            <CloseIcon />
                        </Button>
                        : undefined
                    }
                    sx={{
                        ...alertStyle
                    }}
                >
                    {alert.text}
                </Alert>
            ))}
        </Stack>
    </AlertContext.Provider>;
}