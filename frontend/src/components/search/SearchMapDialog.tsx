import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch } from 'src/context/search/useSearch';
import { Dialog, DialogProps } from 'src/components/dialog/Dialog';
import { LocationOption } from 'src/context/search/interfaces';

import { RadiusSlider } from './RadiusSlider';

type ResourceType = 'places' | 'offers';

interface SearchDialogProps {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
}

export const SearchMapDialog = (props: SearchDialogProps) => {
    const {t} = useTranslation('search');
    const {setPlaceSearchQuery} = useSearch();
    const [recourceType, setResourceType] = useState<ResourceType>('places');
    const [locationOption, setLocationOption] = useState<LocationOption | null>(null);

    const handleResourceTypeChange = (event: React.SyntheticEvent, newValue: ResourceType) => {
        setResourceType(newValue);
    };

    const handlePositionOptionChange = (
        event: React.MouseEvent<HTMLElement>,
        newLocation: LocationOption,
    ) => {
        setLocationOption(newLocation);
    };

    const handleSearch = () => {
        setPlaceSearchQuery({location: 'mapLocation'});
        props.onClose();
    };

    return <Dialog
        title={t<string>('search')}
        open={props.open}
        onClose={props.onClose}
    >
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Tabs value={recourceType}>
                <Tab 
                    label={t('dialog.tabs.offers')}
                    value={'offers'}
                />
                <Tab
                    label={t('dialog.tabs.places')}
                    value={'places'}
                />
            </Tabs>
        </Box>
        <Box
            sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: 2
            }}
        >
            <TextField 
                label={t('dialog.form.name')}
                sx={{
                    width: '100%'
                }}
            />
            <TextField 
                label={t('dialog.form.street')}
                sx={{
                    width: '100%'
                }}
            />
            <ToggleButtonGroup 
                value={locationOption}
                exclusive
                onChange={handlePositionOptionChange}
                color='secondary'
                sx={{
                    width: '100%',
                    boarder: 5
                }}
            >
                <ToggleButton
                    value={'userLocation'}
                    sx={{
                        width: '100%',
                        color: 'white'
                    }}
                >
                    {t('dialog.form.locationUser')}
                </ToggleButton>
                <ToggleButton
                   value={'mapPosition'}
                    sx={{
                        width: '100%',
                        color: 'white'
                    }}
                >
                    {t('dialog.form.locationMap')}
                </ToggleButton>
            </ToggleButtonGroup>
            <RadiusSlider 
                sx={{
                    width: '90%'
                    
                }}
            />
            <Button
                variant='contained'
                fullWidth
                startIcon={ <SearchIcon />}
                onClick={handleSearch}
            >
                {t('search')}
            </Button>
        </Box>
    </Dialog>
};