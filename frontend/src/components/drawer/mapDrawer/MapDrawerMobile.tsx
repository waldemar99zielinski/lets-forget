import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { theme } from 'src/context/theme/ThemeProvider';
import { useHeaderHeight } from 'src/hooks/useHeaderHeight';
import { bottomNavigationHeight } from 'src/components/layout/navigation/BottomNavigation';

const drawerHeaderHeight = 56;

interface Props {

}

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export const MapDrawerMobile = (props: Props) => {
    const [open, setOpen] = React.useState(true);
    const headerHeight = useHeaderHeight();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

  return <Root>
        <Global
            styles={{
                '& .MuiDrawer-root': {
                    zIndex: '500 !important',
                },
                '.MuiDrawer-root > .MuiPaper-root': {
                    height: `calc(90% - ${drawerHeaderHeight}px - ${bottomNavigationHeight}px - ${headerHeight}px)`,
                    overflow: 'visible',
                    background: theme.palette.background.paper,
                    bottom: bottomNavigationHeight,
                },
            }}
        />
        <SwipeableDrawer
            anchor='bottom'
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerHeaderHeight}
            disableSwipeToOpen={false}
            ModalProps={{
            keepMounted: true,
            }}
        >
            <StyledBox
                sx={{
                    position: 'absolute',
                    top: open ? - drawerHeaderHeight : - bottomNavigationHeight - drawerHeaderHeight,
                    right: 0,
                    left: 0,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: 'visible',
                    background: theme.palette.background.paper,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                }}
                onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    setOpen(true)
                }}
            >
                <Puller id='puller'/>
                <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
            </StyledBox>
            <StyledBox
            sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
                background: theme.palette.background.paper
            }}
            >
            <Skeleton variant="rectangular" height="100%" />
            <div>XD</div>
            </StyledBox>
        </SwipeableDrawer>
    </Root>;
    }
