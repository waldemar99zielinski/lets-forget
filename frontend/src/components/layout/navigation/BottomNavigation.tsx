import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from 'react-router-dom';

import { currentlyActive, navigationItems } from './navigationItems';

export const bottomNavigationHeight = 60;

export const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: bottomNavigationHeight}}>
        <MuiBottomNavigation
            showLabels
            value={currentlyActive[location.pathname]}
        >
            {
                navigationItems.map((item) => <BottomNavigationAction
                    key={item.key}
                    label={item.text}
                    icon={item.icon}
                    onClick={() => navigate(item.to)}
                    value={item.key}
                />)
            }
        </MuiBottomNavigation>
    </Paper>;
}