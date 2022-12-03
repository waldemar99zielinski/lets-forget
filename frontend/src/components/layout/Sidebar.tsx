import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPath, Path } from 'src/router/routes';
import { Icon, IconKeys } from 'src/components/icon';

const {Sider} = Layout;

enum MenuKeys {
    root = 'root',
    map = 'map',
    profile = 'profile'
}

const currently_active = {
    [getPath(Path.root)]: MenuKeys.root,
    [getPath(Path.map)]: MenuKeys.map,
    [getPath(Path.profile)]: MenuKeys.profile
}

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items: MenuProps['items'] = [
        {
            key: MenuKeys.root,
            icon: <Icon iconKey={IconKeys.home} color='white' />,
            label: 'Home',
            onClick: () => navigate(getPath(Path.root))
        },
        {
            key: MenuKeys.map,
            icon: <Icon iconKey={IconKeys.map} color='white' />,
            label: 'Map',
            onClick: () => navigate(getPath(Path.map))
        },
        {
            key: MenuKeys.profile,
            icon: <Icon iconKey={IconKeys.userProfile} color='white' />,
            label: 'Profile',
            onClick: () => navigate(getPath(Path.profile))
        },
    ];

    return <Sider theme='dark'>
        <Menu
            mode='inline'
            theme='dark'
            items={items}
            selectedKeys={[currently_active[location.pathname] || MenuKeys.root]}
        />
    </Sider>;
};