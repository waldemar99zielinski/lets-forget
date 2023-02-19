import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { borderRadius } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';

import { theme } from 'src/context/theme/ThemeProvider';

import { currentlyActive, navigationItems } from './navigationItems';

export const bottomNavigationHeight = 60;

export const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Paper sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: bottomNavigationHeight,
            backgroundColor: theme.palette.primary.main,
            zIndex: theme.zIndex.drawer,
            borderRadius: 0,
        }}>
        <MuiBottomNavigation
            showLabels
            value={currentlyActive[location.pathname]}
            sx={{
                backgroundColor: theme.palette.primary.main,
                [`& .Mui-selected`]: {color: '#424040 !important'},
            }}
        >
            {
                navigationItems.map((item) => <BottomNavigationAction
                    key={item.key}
                    label={item.text}
                    icon={item.icon}
                    onClick={() => navigate(item.to)}
                    value={item.key}
                    sx={{
                        [`& .Mui-selected`]: {color: '#424040 !important'},
                    }}
                />)
            }
        </MuiBottomNavigation>
    </Paper>;
}