import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DialogProps } from 'src/components/dialog/Dialog';
import { useAlert } from 'src/context/alerts/useAlert';
import { LocalStorage } from 'src/utils/localStorage/LocalStorage';
import { Logger } from 'src/utils/logger';

import { SelectDefaultCityDialogBase } from './SelectDefaultCityDialogBase';

interface SelectDefaultCityDialogAuthUser {
    open: DialogProps['open'];
    onClose: DialogProps['onClose'];
    defaultCity: string | undefined;
}

export const SelectDefaultCityDialogUnauthUser = (props: SelectDefaultCityDialogAuthUser) => {
    const {t} = useTranslation('user');
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

            LocalStorage.setItem('defaultCity', selectedCity);

            setIsSubmitLoading(false);
            props.onClose();
        } catch(error: any) {
            Logger.error('Change username error', error);
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
    />
}