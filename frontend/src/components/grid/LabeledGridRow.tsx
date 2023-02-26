import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

import { useIsMobile } from 'src/hooks/useIsMobile';

interface LabeledGridRowProps {
    label: string;
}

export const LabeledGridRow = (props: PropsWithChildren<LabeledGridRowProps>) => {
    const isMobile = useIsMobile();
    
    return <>
        <Grid item xs={isMobile ? 12 : 4}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%'
            }}>
                <Typography>
                    {props.label}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={isMobile ? 12 : 8}>
            {props.children}
        </Grid>
    </>;
}