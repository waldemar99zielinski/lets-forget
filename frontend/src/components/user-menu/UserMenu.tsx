import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';

import { useIsMobile } from "src/hooks/useIsMobile"

import { UserMenuDropDown } from './UserMenuDropdown';
import { UserMenuPageRedirect } from './UserMenuPageRedirect';

export const UserMenu = () => {
    const isMobile = useIsMobile();

    return isMobile ? <UserMenuPageRedirect /> : <UserMenuDropDown />;
}