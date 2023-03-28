import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

import { Path, getPath } from 'src/router/routes';
import { Logo } from 'src/components/logo/Logo';
import { UserMenu } from 'src/components/user-menu/UserMenu';
import { useHeaderHeight } from 'src/hooks/useHeaderHeight';
import { Toolbar } from 'src/components/toolbar/Toolbar';
import { useGlobalContext } from 'src/context/global/useGlobalContext';

export const Header = () => {
    const headerHeight = useHeaderHeight();
    const location = useLocation();
    const {setIsSearchDialogOpened} = useGlobalContext();

    return <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: headerHeight}}>
        <MuiToolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Logo />
            {/**TODO refactor to separate component and handle mobile view */}
            <Box sx={{
                display: 'flex',
                columnGap: '0.5rem'
            }}>
                {location.pathname === getPath(Path.root) && <Toolbar 
                    containerProps={{
                        flexDirection: 'row',
                        columnGap: '0.75rem',
                    }}
                    items={[
                        {
                            icon: <SearchIcon fontSize='small' />,
                            props: {
                                size: 'small',
                                onClick: () => setIsSearchDialogOpened(true)
                            }
                        },
                        {
                            icon: <AddIcon fontSize='small' />,
                            props: {
                                size: 'small',
                                onClick: () => console.log('added clicked :)')
                            }
                        }
                    ]}
                />}
                <UserMenu />
            </Box>
  
        </MuiToolbar>
    </AppBar>;
};