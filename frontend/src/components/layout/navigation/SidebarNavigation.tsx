import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

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
            [`& .MuiDrawer-paper`]: { width: sidebarNavigationWidth, boxSizing: 'border-box' },
        }}
    >
        <Toolbar />
        <List>
            {
                navigationItems.map((item) => <ListItem key={item.key} disablePadding>
                    <ListItemButton 
                        selected={currentlyActive[location.pathname] === item.key}
                        onClick={() => navigate(item.to)}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>)
            }
        </List>
    </Drawer>;
};
