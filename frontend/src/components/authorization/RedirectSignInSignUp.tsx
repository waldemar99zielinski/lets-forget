import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPath, Path } from 'src/router/routes';

const map = {
    [getPath(Path.signIn)]: {
        textKey: 'noAccount',
        linkKey: 'signUp',
        to: getPath(Path.signUp)
    },
    [getPath(Path.signUp)]: {
        textKey: 'haveAccount',
        linkKey: 'signIn',
        to: getPath(Path.signIn)
    }
};

export const RedirectSignInSignUp = () => {
    const {t} = useTranslation('authorization');
    const location = useLocation();
    const navigate = useNavigate();

    return <Box
        onClick={() => navigate(map[location.pathname].to)}
        sx={{
            display: 'flex',
            columnGap: 2,
            cursor: 'pointer'
        }}
    >
        <Typography>{t(map[location.pathname].textKey)}</Typography>
        <Link>{t(map[location.pathname].linkKey)}</Link>
    </Box>;
}