import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { patchUserMe, PatchUserMe } from 'src/api/user/user.api';
import { useAlert } from 'src/context/alerts/useAlert';
import { Dialog, DialogProps } from 'src/components/dialog/Dialog';
import { useUser } from 'src/context/user/useUser';
import { Logger } from 'src/utils/logger';
import { getCountries } from 'src/api/countries/countries.api';
import { getCities } from 'src/api/cities/cities.api';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { lineHeight } from '@mui/system';

interface SelectDefaultCityDialogProps {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
}

export const SelectDefaultCityDialog = (props: SelectDefaultCityDialogProps) => {
    const {t} = useTranslation('user');
    const [updateUserCityError] = useAlert({text: t('dialog.selectDefaultCity.error.request'), type: 'error', closeAfter: 3_000});
    const {user, updateUser} = useUser();
    const [isFetchCountriesLoading, setIsFetchCountriesLoading] = useState(true);
    const [isFetchCitiesLoading, setIsFetchCitiesLoading] = useState(true);
    const [countiresList, setCountriesList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [citiesList, setCitiesList] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    useEffect(() => {
        if(!user || !user.defaultCity)
            return;

        setSelectedCity(user.defaultCity);
    }, [user]);

    useEffect(() => {
        const abortCountries = new AbortController();
        const abortCities = new AbortController();

        (async () => {
            setIsFetchCountriesLoading(true);

            const countries = await getCountries();

            setCountriesList(countries);

            setIsFetchCountriesLoading(false);
            setIsFetchCitiesLoading(true);

            const cities = await getCities();

            setCitiesList(cities);

            setIsFetchCitiesLoading(false);
        })();

        return () => {
            abortCountries.abort();
            abortCities.abort();
        };
    }, []);

    useEffect(() => {
        if(isFetchCountriesLoading || isFetchCitiesLoading)
            return;

        if(selectedCity) {
            const cityInfo = citiesList.filter(city => city.id === selectedCity)[0];
            setSelectedCountry(cityInfo.countryId);
        }
    }, [isFetchCountriesLoading, isFetchCitiesLoading, selectedCity]);

    if(!user) {
        Logger.debug('User is not present');
        return null;
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!selectedCity || !selectedCountry)
            return;

        try {
            setIsSubmitLoading(true);
            await patchUserMe({defaultCity: selectedCity});
            updateUser({defaultCity: selectedCity});
            setIsSubmitLoading(false);
            props.onClose();
        } catch(error: any) {
            Logger.error('Change username error', error);
            updateUserCityError();
        }
    };

    return <Dialog
        title={t<string>('dialog.selectDefaultCity.title')}
        open={props.open}
        onClose={props.onClose}
        disableClose={!user.defaultCity}
    >
        <form onSubmit={onSubmit}>
            <Typography
                sx={{
                    padding: '1rem'
                }}
            >
                {t('dialog.selectDefaultCity.text')}
            </Typography>
            <Box sx={{
                padding: '1rem 1rem 0 1rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem'
            }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('dialog.selectDefaultCity.countryLabel')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCountry}
                        label={t('offerType')}
                        onChange={(event: SelectChangeEvent) => setSelectedCountry(event.target.value)}
                        fullWidth
                        disabled={isFetchCountriesLoading}
                    >
                        {countiresList.map((country, index) => <MenuItem
                            key={index}
                            value={country.id}
                        >
                            {country.id}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('dialog.selectDefaultCity.cityLabel')}</InputLabel>
                    <Tooltip title={selectedCountry ? '' : t('dialog.selectDefaultCity.citySelectDiabled')} arrow>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCity}
                            label={t('offerType')}
                            onChange={(event: SelectChangeEvent) => setSelectedCity(event.target.value)}
                            fullWidth
                            disabled={!selectedCity ||(isFetchCitiesLoading || !selectedCountry)}
                        >
                            {isFetchCitiesLoading && selectedCity
                            ? <MenuItem value={selectedCity}>{selectedCity}</MenuItem>
                            : citiesList.filter((city) => city.countryId === selectedCountry).map((city, index) => <MenuItem
                                key={index}
                                value={city.id}
                            >
                                {city.id}
                            </MenuItem>)}
                        </Select>
                    </Tooltip>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    columnGap: '0.5rem'
                }}
            >
                {user.defaultCity && <Button
                    variant='contained'
                    fullWidth
                    onClick={props.onClose}
                >
                    {t('dialog.selectDefaultCity.buttons.cancel')}
                </Button>}
                <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={isSubmitLoading}
                >
                    {isSubmitLoading ? <CircleLoading loadingProps={{size: 25}}/> : t('dialog.selectDefaultCity.buttons.save')}
                </Button>
            </Box>
        </form>
    </Dialog>
}