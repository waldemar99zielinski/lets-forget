import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export const AuthStrategyDivider = () => {
    const {t} = useTranslation('authorization');
    return <Typography>{t('or')}</Typography>;
}