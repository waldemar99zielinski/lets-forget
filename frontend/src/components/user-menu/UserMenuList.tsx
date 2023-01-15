import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/context/auth/useAuth';

interface UserMenuListProps {
    onItemClick?: () => void;
}

export const UserMenuList = (props: UserMenuListProps) => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleAction = (action: () => void) => {
        if(props.onItemClick)
            props.onItemClick();

        action();
    };

    const items = [
        {
            key: 'profile',
            icon: <PersonIcon />,
            text: 'Go to profile',
            action: () => handleAction(() => console.log('go to navigate'))
        },
        {
            key: 'signout',
            icon: <ExitToAppIcon />,
            text: 'Sign out',
            action: () => handleAction(() => {
                signOut();
                navigate('/');
            })
        }
    ];

    return <MenuList
        sx={{
            width: '100%'
        }}
    >
        {items.map((item) => <MenuItem 
            key={item.key}
            onClick={item.action}
        >
            <ListItemIcon sx={{color: 'white'}}>
                {item.icon}
            </ListItemIcon>
            <ListItemText>
                {item.text}
            </ListItemText>
        </MenuItem>)}
    </MenuList>;
}