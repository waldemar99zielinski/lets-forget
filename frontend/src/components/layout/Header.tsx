import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const Header = () => {
    return <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <div>xd</div>
        </Toolbar>
    </AppBar>;
};