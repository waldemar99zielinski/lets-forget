import Box from '@mui/system/Box';

import { useSearch } from 'src/context/search/useSearch';

import { SearchParamsButton } from './SearchParamsButton';
import { SearchCurrentAreaButton } from './SearchCurrentAreaButton';
import { SearchLocationButton } from './SearchLocationButton';

export const SearchButtonToolbar = () => {

    const {openDialog} = useSearch();

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1
        }}
    >
        <SearchParamsButton 
            onClick={openDialog}
        />
        <SearchCurrentAreaButton disabled={true} />
        <SearchLocationButton />
    </Box>;
}