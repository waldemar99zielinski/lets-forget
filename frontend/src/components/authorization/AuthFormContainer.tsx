import Paper from '@mui/material/Paper';
import { PropsWithChildren } from 'react';

export const AuthFormContainer = (props: PropsWithChildren<unknown>) => {

    return <Paper
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '420px',
            padding: '10px',
            rowGap: 2
        }}
    >
        {props.children}
    </Paper>;
}