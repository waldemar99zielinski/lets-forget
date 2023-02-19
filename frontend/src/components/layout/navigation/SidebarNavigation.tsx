import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useLocation } from 'react-router-dom';

import { theme } from 'src/context/theme/ThemeProvider';
import { currentlyActive, navigationItems } from './navigationItems';

export const sidebarNavigationWidth = 250;

export const SidebarNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return <Drawer
        variant='permanent'
        sx={{
            width: sidebarNavigationWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
                width: sidebarNavigationWidth, 
                boxSizing: 'border-box',
                backgroundColor: theme.palette.primary.main
            },
            [`& .Mui-selected`]: {backgroundColor: 'rgba(249, 249, 249, 0.2) !important'},
            [`& .Mui-selected:hover`]: {backgroundColor: 'rgba(249, 249, 249, 0.2)'}
        }}
        color='secondary'
    >
        <Toolbar />
        <List>
            {
                navigationItems.map((item) => <ListItem key={item.key} disablePadding   sx={{
                    ":hover": {backgroundColor: 'rgba(249, 249, 249, 0.2)'}
                }}>
                    <ListItemButton 
                        selected={currentlyActive[location.pathname] === item.key}
                        onClick={() => navigate(item.to)}
                    >
                        <ListItemIcon sx={{color: 'whitesmoke'}}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>)
            }
        </List>
    </Drawer>;
};
