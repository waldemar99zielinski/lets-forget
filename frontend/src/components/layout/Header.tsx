import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

import { Path, getPath } from 'src/router/routes';
import { Logo } from 'src/components/logo/Logo';
import { UserMenu } from 'src/components/user-menu/UserMenu';
import { useHeaderHeight } from 'src/hooks/useHeaderHeight';
import { Toolbar } from 'src/components/toolbar/Toolbar';
import { useSearch } from 'src/context/search/useSearch';

export const Header = () => {
    const headerHeight = useHeaderHeight();
    const location = useLocation();
    const {openDialog} = useSearch();

    return <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: headerHeight}}>
        <MuiToolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Logo />
            <Box sx={{
                display: 'flex',
                columnGap: '1rem'
            }}>
                {location.pathname === getPath(Path.root) &&<Toolbar 
                    items={[
                        {
                            icon: <SearchIcon fontSize='small' />,
                            props: {
                                size: 'small',
                                onClick: openDialog
                            }
                        }
                    ]}
                />}
                <UserMenu />
            </Box>
  
        </MuiToolbar>
    </AppBar>;
};