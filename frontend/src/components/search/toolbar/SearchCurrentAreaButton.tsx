import Fab, { FabProps } from '@mui/material/Fab';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';

export const SearchCurrentAreaButton = (props: FabProps) => {
    return <Fab 
        sx={{
            borderRadius: '10%'
        }}
        {...props}
    >
        <HighlightAltIcon />
    </Fab>;
};