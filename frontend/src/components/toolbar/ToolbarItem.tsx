import Fab, { FabProps } from '@mui/material/Fab';
import { PropsWithChildren } from 'react';

export type ToolbarItemProps = PropsWithChildren<FabProps>;

export const ToolbarItem = (props: ToolbarItemProps) => {
    return <Fab 
        sx={{
            borderRadius: '10%'
        }}
        {...props}
    >
        {props.children}
    </Fab>;
};