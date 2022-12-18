import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom'

export const FullPageLayout = () => {
    return <Box
        width='100%'
        height='100%'
    >
        <CssBaseline />
        <Outlet />
    </Box>;
}