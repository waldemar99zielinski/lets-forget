import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const MobileBackNavigationView = (props: PropsWithChildren<unknown>) => {
    const navigate = useNavigate();

    return <Box
        width='100%'
        height='100%'
        display='flex'
        flexDirection='column'
    >
        <Box>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize='large' sx={{color: 'white'}}/>
            </IconButton>
        </Box>
        {props.children}
    </Box>;
}