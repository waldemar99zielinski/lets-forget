import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';

import { StandardOfferTypes } from 'src/types/OfferType';
import { SetOfferSearchQueryParams } from 'src/context/search/interfaces';

interface SearchOfferFormProps {
    formRegister: UseFormRegister<SetOfferSearchQueryParams>;
}

export const SearchOfferForm = (props: SearchOfferFormProps) => {
    const {t} = useTranslation('search');
    const {t: ott} = useTranslation('offersTypes');
    const [selectedOfferType, setSelectedOfferType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedOfferType(event.target.value as string);
    };

    return <>
        <TextField 
            label={t('dialog.form.name')}
            sx={{
                width: '100%'
            }}
        />
        {/* <Controller
            name='offerType'
            control={props.formControl}
            render={({onChange, value, ref}) => ( */}
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{ott('offerType')}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...props.formRegister('offerType')}
                    // value={selectedOfferType}
                    label={ott('offerType')}
                    // onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
                    fullWidth
                >
                    <MenuItem value={''}>
                        {ott('unset')}
                    </MenuItem>
                    {Object.keys(StandardOfferTypes).map((offerType, index) => <MenuItem
                        key={index}
                        value={offerType}
                    >
                        {ott(offerType)}
                    </MenuItem>)}
                </Select>
            </FormControl>
            {/* )}
        /> */}
        <TextField 
            label={t('dialog.form.priceMax')}
            sx={{
                width: '100%'
            }}
        />
    </>;
}