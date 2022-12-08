import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import {MouseEvent, useState } from 'react';

import { UserMenuButton } from './UserMenuButton'
import { UserMenuList } from './UserMenuList';

export const UserMenuDropDown = () => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const closeMenu = () => setAnchor(null);

    return <>
        <UserMenuButton onClick={(event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)}/>
        <Menu
            anchorEl={anchor}
            open={!!anchor}
            onClose={closeMenu}
        >
            <UserMenuList onItemClick={closeMenu}/>
        </Menu>
    </>;
};