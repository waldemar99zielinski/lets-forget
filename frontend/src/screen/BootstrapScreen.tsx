import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { CircleLoading } from 'src/components/loading/CircleLoading';

export const BootstrapScreen = () => {
    return <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <CssBaseline />
        <CircleLoading />
    </Box>;
}