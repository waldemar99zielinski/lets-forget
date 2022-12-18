import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { activateEmailApi } from 'src/api/authentication/authentication.api';
import { useAlert } from 'src/context/alerts/useAlert';
import { CircleLoading } from 'src/components/loading/CircleLoading';
import { getPath, Path } from 'src/router/routes';
import { Logger } from 'src/utils/logger';

export const EmailActivation = () => {
    const {t} = useTranslation('authorization');
    const [search] = useSearchParams();
    const navigate = useNavigate();
    const [activationSuccessAlert] = useAlert({text: t('emailActivationSuccesAlert'), type: 'success', closeAfter: 3_000});
    const [activationErrorAlert] = useAlert({text: t('emailActivationErrorAlert'), type: 'error', closeAfter: 3_000});

    useEffect(() => {
        const token = search.get('token');

        if(!token) {
            Logger.warn('Token is not present in search params');
            navigate(getPath(Path.signUp));
            return;
        }

        activateEmailApi(token)
            .then(() => {
                activationSuccessAlert();
                navigate(getPath(Path.signIn));
            })
            .catch((error) => {
                Logger.error('Email activation request failed: ', error);
                activationErrorAlert();
                navigate(getPath(Path.signUp));
            });
    }, [search]);

    return <CircleLoading />;
}