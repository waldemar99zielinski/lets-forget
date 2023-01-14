import Fab, { FabProps } from '@mui/material/Fab';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

export const SearchLocationButton = (props: FabProps) => {
    return <Fab 
        sx={{
            borderRadius: '10%'
        }}
        {...props}
    >
        <LocationSearchingIcon />
    </Fab>;
};