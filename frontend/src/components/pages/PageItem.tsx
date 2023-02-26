import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

import { theme } from 'src/context/theme/ThemeProvider';

interface PageItemProps {
    title?: string;

}

export const PageItem = (props: PropsWithChildren<PageItemProps>) => {
    return <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
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
