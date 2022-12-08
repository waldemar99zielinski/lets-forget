import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { MouseEvent } from 'react';

interface UserMenuButtonProps {
    onClick: (event: MouseEvent<HTMLElement>) => void;
}

export const UserMenuButton = (props: UserMenuButtonProps) => {
    return <IconButton
        onClick={props.onClick}
    >
        <PersonIcon sx={{color: 'white'}}/>
    </IconButton>;
}