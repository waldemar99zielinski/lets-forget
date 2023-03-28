import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material';

import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';

interface ToolbarProps {
    containerProps?: BoxProps;
    items: {
        icon: JSX.Element;
        props?: ToolbarItemProps;
    }[];
}

export const Toolbar = (props: ToolbarProps) => {
    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1,
            ...props.containerProps
        }}
    >
        {props.items.map((element, index) => <ToolbarItem key={index} {...element.props}>
            {element.icon}
        </ToolbarItem>)}
    </Box>;
}