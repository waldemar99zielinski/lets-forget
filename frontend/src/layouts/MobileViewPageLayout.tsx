import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom'

export const MobileViewPageLayout = () => {
    return <Box>
        <CssBaseline />
        <Outlet />
    </Box>;
}