import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { signUpApi } from 'src/api/authentication/authentication.api';
import { useAlert } from 'src/context/alerts/useAlert';
import { validationRegex } from 'src/utils/text-validation/regex';
import { getPath, Path } from 'src/router/routes';
import { Logger } from 'src/utils/logger';

export const SignUpForm = () => {
    const {t} = useTranslation('authorization');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [openSignUpSuccessAlert] = useAlert({text: t('signUpSuccessAlert'), type: 'success', manuallyClosable: true});
    const [openSignUpErrorAlert] = useAlert({text: t('signUpErrorAlert'), type: 'error', closeAfter: 3_000});

    const resetInputs = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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

        if(password.length < 8) {
            setPasswordError(t('formErrors.passwordLengthInvalid') as string);
            return;
        }

        if(!confirmPassword) {
            setConfirmPasswordError(t('formErrors.fieldRequired') as string);
            return;
        }

        if(password !== confirmPassword) {
            setConfirmPasswordError(t('formErrors.confirmPasswordDoesNotMatch') as string);
            return;
        }

        try {
            setIsLoading(true);

            await signUpApi(email, password);

            openSignUpSuccessAlert();
            navigate(getPath(Path.signIn));
        }
        catch(error) {
            Logger.error('Sign up request error: ', error);
            openSignUpErrorAlert();
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
            {t('signUp')}
        </Typography>
        <form 
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}
            onSubmit={onSubmit}
        >
            <TextField 
                label={t('emailPlaceholder')}
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmailError('');
                    setEmail(event.target.value);
                }}
                error={!!emailError}
                helperText={emailError || ' '}
            />
            <TextField 
                label={t('passwordPlaceholder')}
                type='password'
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPasswordError('');
                    setPassword(event.target.value);
                }}
                error={!!passwordError}
                helperText={passwordError || ' '}
            />
            <TextField 
                label={t('passwordPlaceholder')}
                type='password'
                value={confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setConfirmPasswordError('');
                    setConfirmPassword(event.target.value);
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError || ' '}
            />
            <Button
                variant='contained'
                type='submit'
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={25} /> : t('signUp')}
            </Button>
        </form>
    </>;
}