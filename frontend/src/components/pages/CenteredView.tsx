import Box from '@mui/system/Box';
import { PropsWithChildren } from 'react';

export const CenteredView = (props: PropsWithChildren<unknown>) => {
    return <Box
        width='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
    >
        {props.children}
    </Box>;
}