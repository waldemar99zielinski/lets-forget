import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export const SearchPlaceForm = () => {
    const {t} = useTranslation('search');

    return <>
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
    </>;
}