import Fab, { FabProps } from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';

export const SearchParamsButton = (props: FabProps) => {
    return <Fab 
        sx={{
            borderRadius: '10%'
        }}
        {...props}
    >
        <SearchIcon />
    </Fab>;
};