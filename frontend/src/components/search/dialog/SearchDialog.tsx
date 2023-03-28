import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { SyntheticEvent, useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {useForm} from 'react-hook-form';

import { useSearch } from 'src/context/search/useSearch';
import { Dialog, DialogProps } from 'src/components/dialog/Dialog';
import { LocationOption, SetPlaceSearchQueryParams, SetOfferSearchQueryParams } from 'src/context/search/interfaces';

import { SearchPlaceForm } from './SearchPlaceForm';
import { SearchOfferForm } from './SearchOfferForm';

type ResourceType = 'places' | 'offers';

interface SearchDialogProps {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
}

export const SearchDialog = (props: SearchDialogProps) => {
    const {t} = useTranslation('search');
    const {setPlaceSearchQuery, setOfferSearchQuery} = useSearch();
    const [resourceType, setResourceType] = useState<ResourceType>('offers');
    const [locationOption, setLocationOption] = useState<LocationOption | null>(null);
    const {register: registerOffer, handleSubmit: handleSubmitOffer} = useForm<SetOfferSearchQueryParams>();
    const {register: registerPlace, handleSubmit: handleSubmitPlace} = useForm<SetPlaceSearchQueryParams>();

    const handleResourceTypeChange = (event: React.SyntheticEvent, newValue: ResourceType) => {
        setResourceType(newValue);
    };

    const handlePositionOptionChange = (
        event: React.MouseEvent<HTMLElement>,
        newLocation: LocationOption,
    ) => {
        setLocationOption(newLocation);
    };

    const handleSearch = useMemo(() => {
        console.log('handle search', resourceType);

        if(resourceType === 'offers')
            return handleSubmitOffer((data: SetOfferSearchQueryParams) => {
                setOfferSearchQuery({
                    ...data
                });

                props.onClose();
            });
        

        if(resourceType === 'places')
            return handleSubmitPlace((data: SetPlaceSearchQueryParams) => {
                setPlaceSearchQuery({
                    ...data
                });

                props.onClose();
            });
        
        throw new Error('Search dialog undefined action');
    }, [resourceType]);

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
            <Tabs 
                value={resourceType} 
                onChange={(_: SyntheticEvent, newValue: ResourceType) => setResourceType(newValue)}
                textColor='inherit'
            >
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
        <form onSubmit={handleSearch}>
            <Box
                sx={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 2
                }}
            >
                {resourceType === 'places' && <SearchPlaceForm formRegister={registerPlace}/>
                || <SearchOfferForm formRegister={registerOffer} />}
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
                <Button
                    variant='contained'
                    fullWidth
                    startIcon={ <SearchIcon />}
                    type='submit'
                >
                    {t('search')}
                </Button>
            </Box>
        </form>
    </Dialog>
};