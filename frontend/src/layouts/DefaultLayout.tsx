import { Layout as AntDLayout } from 'antd';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/layout/Header';
import { Sidebar } from 'src/components/layout/Sidebar';

export const DefaultLayout = () => {
	return <AntDLayout style={{height: '100%'}}>
		<Header />
		<AntDLayout>
			<Sidebar />
			<Outlet />
		</AntDLayout>
	</AntDLayout>;
};