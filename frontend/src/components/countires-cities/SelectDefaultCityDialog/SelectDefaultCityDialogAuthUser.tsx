import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { patchUserMe } from 'src/api/user/user.api';
import { DialogProps } from 'src/components/dialog/Dialog';
import { useAlert } from 'src/context/alerts/useAlert';
import { useUser } from 'src/context/user/useUser';
import { Logger } from 'src/utils/logger';

import { SelectDefaultCityDialogBase } from './SelectDefaultCityDialogBase';

interface SelectDefaultCityDialogAuthUser {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
    defaultCity: string | undefined;
}

export const SelectDefaultCityDialogAuthUser = (props: SelectDefaultCityDialogAuthUser) => {
    const {t} = useTranslation('user');
    const {updateUser} = useUser();
    const [selectedCity, setSelectedCity] = useState(props.defaultCity || '');
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [updateUserCityError] = useAlert({text: t('dialog.selectDefaultCity.error.request'), type: 'error', closeAfter: 3_000});


    useEffect(() => {
        setSelectedCity(props.defaultCity || '');
    }, [props.defaultCity]);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!selectedCity)
            return;

        try {
            setIsSubmitLoading(true);
            await patchUserMe({defaultCity: selectedCity});
            updateUser({defaultCity: selectedCity});
            setIsSubmitLoading(false);
            props.onClose();
        } catch(error: any) {
            Logger.error('Update user default city', error);
            updateUserCityError();
        }
    };

    return <SelectDefaultCityDialogBase
        open={props.open}
        onClose={props.onClose}
        defaultCity={props.defaultCity}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onSubmit={onSubmit}
        isSubmitLoading={isSubmitLoading}
    />;
}