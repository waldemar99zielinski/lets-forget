import Box from '@mui/system/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/layout/Header';
import { SidebarNavigation } from 'src/components/layout/navigation/SidebarNavigation';
import { BottomNavigation } from 'src/components/layout/navigation/BottomNavigation';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { bottomNavigationHeight } from 'src/components/layout/navigation/BottomNavigation';

export const DefaultPageLayout = () => {
	const isMobile = useIsMobile();

	return <Box sx={{height: '100%', display: 'flex'}}>
		<CssBaseline />
		<Header />
		{isMobile ? <BottomNavigation/> : <SidebarNavigation />}
		<Box component="main" width='100%'>
			<Toolbar />
				<Outlet />
		</Box>
	</Box>;
};