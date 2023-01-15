import { useNavigate } from 'react-router-dom';

import { useIsMobile } from 'src/hooks/useIsMobile'
import { useAuth } from 'src/context/auth/useAuth';
import { getPath, Path } from 'src/router/routes';

import { UserMenuDropDown } from './UserMenuDropdown';
import { UserMenuPageRedirect } from './UserMenuPageRedirect';
import { UserMenuButton } from './UserMenuButton';

export const UserMenu = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    if(!isSignedIn)
        return <UserMenuButton onClick={() => navigate(getPath(Path.signIn))}/>;

    return isMobile ? <UserMenuPageRedirect /> : <UserMenuDropDown />;
}