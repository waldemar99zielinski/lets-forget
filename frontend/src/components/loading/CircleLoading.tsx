import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { forwardRef } from 'react';

interface CircleLoadingProps {
    containerProps?: BoxProps;
    loadingProps?: CircleLoadingProps;
}

export const CircleLoading = forwardRef((props: CircleLoadingProps, ref) => {
    return <Box {...props.containerProps} ref={ref} >
        <CircularProgress color='secondary' {...props.loadingProps} />
    </Box>;
});