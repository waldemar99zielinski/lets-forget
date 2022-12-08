import { MobileBackNavigationView } from 'src/components/pages/MobileBackNavigationView';
import { UserMenuList } from 'src/components/user-menu/UserMenuList';

export const MobileUserMenuPage = () => {
    return <MobileBackNavigationView>
        <UserMenuList />
    </MobileBackNavigationView>;
};