import Box, { BoxProps } from '@mui/system/Box';
import { PropsWithChildren } from 'react';

interface CenteredViewProps {
    container?: BoxProps;
}

export const CenteredView = (props: PropsWithChildren<CenteredViewProps>) => {
    return <Box
        width='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        {...props.container}
    >
        {props.children}
    </Box>;
}