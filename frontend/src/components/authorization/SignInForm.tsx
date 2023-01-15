import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAlert } from 'src/context/alerts/useAlert';
import { useAuth } from 'src/context/auth/useAuth';
import { validationRegex } from 'src/utils/text-validation/regex';
import { Logger } from 'src/utils/logger';

export const SignInForm = () => {
    const {t} = useTranslation('authorization');
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [openSignInErrorAlert] = useAlert({text: t('signInError'), type: 'error', closeAfter: 3_000});

    const resetInputs = () => {
        setEmail('');
        setPassword('');
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(!email) {
            setEmailError(t('formErrors.fieldRequired') as string);
            return;
        }

        if(!validationRegex.email.test(email)) {
            setEmailError(t('formErrors.emailFormatInvalid') as string);
            return;
        }

        if(!password) {
            setPasswordError(t('formErrors.fieldRequired') as string);
            return;
        }

        try {
            setIsLoading(true);

            await signIn(email, password);

            navigate('/');
        }
        catch(error: any) {
            Logger.error('Sign in requeset error:', error);

            if(error.response && error.response.status === 401) {
                setEmailError(t('formErrors.signInUnauthorized') as string);
                setPasswordError(t('formErrors.signInUnauthorized') as string);
                return;
            }

            openSignInErrorAlert();
            resetInputs();
        }
        finally {
            setIsLoading(false);
        }
    };

    return <>
        <Typography variant='h4' sx={{
            marginBottom: '1rem'
        }}>
            {t('signIn')}
        </Typography>
        <form
            onSubmit={onSubmit}
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}
        >
            <TextField 
                value={email}
                label={t('emailPlaceholder')}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmailError('');
                    setEmail(event.target.value);
                }}
                error={!!emailError}
                helperText={emailError || ' '}
            />
            <TextField
                value={password}
                label={t('passwordPlaceholder')}
                type='password'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPasswordError('');
                    setPassword(event.target.value);
                }}
                error={!!passwordError}
                helperText={passwordError || ' '}
            />
            <Button
                variant='contained'
                type='submit'
            >
                {t('signIn')}
            </Button>
        </form>
    </>;
}