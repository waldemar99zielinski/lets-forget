import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, PropsWithChildren } from 'react';

import { useIsMobile } from 'src/hooks/useIsMobile';

export interface DialogProps extends MuiDialogProps {
    open: boolean;
    onClose: () => void;
    disableClose?: boolean;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
    children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const mobileProps: Partial<MuiDialogProps> = {
    TransitionComponent: Transition,
    fullScreen: true
};

export const Dialog = (props: PropsWithChildren<DialogProps>) => {
    const isMobile = useIsMobile();
    const {disableClose = false} = props;

    return <MuiDialog 
        open={props.open}
        onClose={disableClose ? undefined : props.onClose}
        fullWidth
        {...isMobile ? mobileProps : {}}
    >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {props.title}
            </Typography>
            {!disableClose &&
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
        {props.children}
    </MuiDialog>;
}