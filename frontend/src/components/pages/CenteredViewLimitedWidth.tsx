import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

import { CenteredView, CenteredViewProps } from './CenteredView';

interface CenteredViewLimitedWidth {
    maxWidth?: string;
    container?: CenteredViewProps['container'];
}

export const CenteredViewLimitedWidth = (props: PropsWithChildren<CenteredViewLimitedWidth>) => {
    return <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <CenteredView container={{
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: props.maxWidth || '900px',
            justifyContent: 'center',
            ...props.container
        }}>
            {props.children}
        </CenteredView>
    </Box>;
}