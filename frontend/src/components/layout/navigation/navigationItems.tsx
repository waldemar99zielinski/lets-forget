import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';

import { getPath, Path } from 'src/router/routes';

enum MenuKeys {
    root = 'root',
    map = 'map',
    profile = 'profile'
};

export const currentlyActive = {
    ['/']: MenuKeys.root,
    [getPath(Path.root)]: MenuKeys.root,
    [getPath(Path.map)]: MenuKeys.map,
    [getPath(Path.profile)]: MenuKeys.profile
};

export const navigationItems = [
    {
        key: MenuKeys.root,
        text: 'Home',
        icon: <HomeIcon />,
        to: getPath(Path.root)
    },
    {
        key: MenuKeys.map,
        text: 'Map',
        icon: <MapIcon />,
        to: getPath(Path.map)
    },
    {
        key: MenuKeys.profile,
        text: 'Profile',
        icon: <PersonIcon />,
        to: getPath(Path.profile)
    }
];
