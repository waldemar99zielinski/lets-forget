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

import { useContriesCities } from 'src/context/countries-cities/useCountriesCities';
import { Dialog, DialogProps } from 'src/components/dialog/Dialog';
import { CircleLoading } from 'src/components/loading/CircleLoading';

interface SelectDefaultCityDialogProps {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
    defaultCity: string | null | undefined;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
    isSubmitLoading: boolean;
}

export const SelectDefaultCityDialogBase = (props: SelectDefaultCityDialogProps) => {
    const {t} = useTranslation('user');
    const {
        countriesList,
        countriesFetchStatus,
        citiesList,
        cityFetchStatus,
    } = useContriesCities();
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        if(countriesFetchStatus === 'loading' || cityFetchStatus === 'loading')
            return;

        if(props.selectedCity) {
            const cityInfo = citiesList.filter(city => city.id === props.selectedCity)[0];
            setSelectedCountry(cityInfo.countryId);
        }
    }, [countriesFetchStatus, cityFetchStatus, props.selectedCity]);

    return <Dialog
        title={t<string>('dialog.selectDefaultCity.title')}
        open={props.open}
        onClose={props.onClose}
        disableClose={!props.defaultCity}
    >
        <form onSubmit={props.onSubmit}>
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
                        disabled={countriesFetchStatus !== 'success'}
                    >
                        {countriesList.map((country, index) => <MenuItem
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
                            value={props.selectedCity}
                            label={t('offerType')}
                            onChange={(event: SelectChangeEvent) => props.setSelectedCity(event.target.value)}
                            fullWidth
                            disabled={(cityFetchStatus !== 'success' || !selectedCountry)}
                        >
                            {cityFetchStatus === 'loading' && props.selectedCity
                            ? <MenuItem value={props.selectedCity}>{props.selectedCity}</MenuItem>
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
                {props.defaultCity && <Button
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
                    disabled={props.isSubmitLoading}
                >
                    {props.isSubmitLoading ? <CircleLoading loadingProps={{size: 25}}/> : t('dialog.selectDefaultCity.buttons.save')}
                </Button>
            </Box>
        </form>
    </Dialog>
}