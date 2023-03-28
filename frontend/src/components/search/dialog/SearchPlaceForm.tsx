import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';

import { SetPlaceSearchQueryParams } from 'src/context/search/interfaces';

interface SearchPlaceFormProps {
    formRegister: UseFormRegister<SetPlaceSearchQueryParams>
}

export const SearchPlaceForm = (props: SearchPlaceFormProps) => {
    const {t} = useTranslation('search');

    return <>
        <TextField 
            label={t('dialog.form.name')}
            sx={{
                width: '100%'
            }}
            {...props.formRegister(
                'name'
            )}
        />
        <TextField 
            label={t('dialog.form.street')}
            sx={{
                width: '100%'
            }}
            {...props.formRegister(
                'street'
            )}
        />
    </>;
}