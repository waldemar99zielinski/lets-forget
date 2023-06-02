import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

import { theme } from 'src/context/theme/ThemeProvider';
import { useIsMobile } from 'src/hooks/useIsMobile';

interface PageItemProps {
    title?: string;

}

export const PageItem = (props: PropsWithChildren<PageItemProps>) => {
    const isMobile = useIsMobile();

    return <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '0 0.35rem' : '0'
    }}>
        {props.title && <Box>
            <Typography fontSize='1.5rem'>
                {props.title}
            </Typography>
        </Box>}
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.secondary.dark,
            padding: '1rem'
        }}>
            {props.children}
        </Paper>
    </Box>;
}
