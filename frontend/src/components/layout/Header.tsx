import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from 'src/components/logo/Logo';
import { UserMenu } from 'src/components/user-menu/UserMenu';
import { useHeaderHeight } from 'src/hooks/useHeaderHeight';

export const Header = () => {
    const headerHeight = useHeaderHeight();

    return <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: headerHeight}}>
        <Toolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Logo />
            <UserMenu />
        </Toolbar>
    </AppBar>;
};