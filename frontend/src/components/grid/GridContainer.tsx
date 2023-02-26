import Grid, {GridProps} from '@mui/material/Grid';
import { PropsWithChildren } from 'react';

export const GridContainer = (props: PropsWithChildren<GridProps>) => {
    return <Grid container rowGap='1rem' {...props}>
        {props.children}
    </Grid>;
}