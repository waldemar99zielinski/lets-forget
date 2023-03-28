import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { GenericAbortSignal } from 'axios';

import { getCities, GetCitiesRequestQuery } from 'src/api/cities/cities.api';
import { getCountries } from 'src/api/countries/countries.api';
import { Logger } from 'src/utils/logger/logger';
import { useAuth } from 'src/context/auth/useAuth';
import { useUser } from 'src/context/user/useUser';
import { SelectDefaultCityDialogAuthUser } from 'src/components/countires-cities/SelectDefaultCityDialog/SelectDefaultCityDialogAuthUser';
import { SelectDefaultCityDialogUnauthUser } from 'src/components/countires-cities/SelectDefaultCityDialog/SelectDefaultCityDialogUnauthUser';
import { LocalStorage } from 'src/utils/localStorage/LocalStorage';

interface ContriesCitiesContextInteface {
    countriesList: Country[];
    countriesFetchStatus: GenericFetchStatus;
    citiesList: City[];
    cityFetchStatus: GenericFetchStatus;
    fetchCities: (query?: GetCitiesRequestQuery) => void | Promise<void>;
    defaultCity: string | undefined;
    setDefautlCity: (city: string) => void;
    openSelectDefaultCityDialog: () => void;
}

export const ContriesCitiesContext = createContext<ContriesCitiesContextInteface>(null!);

type OpenedModalType = 'auth user' | 'unauth user';

export const ContriesCitiesProvider = (props: PropsWithChildren<unknown>) => {
    const [countriesList, setCountriesList] = useState<Country[]>([]);
    const [countriesFetchStatus, setCountriesFetchStatus] = useState<GenericFetchStatus>('loading');
    const [citiesList, setCitiesList] = useState<City[]>([]);
    const [cityFetchStatus, setCityFetchStatus] = useState<GenericFetchStatus>('loading');
    const [defaultCity, setDefaultCity] = useState<string | undefined>(undefined);
    const [openedModalType, setOpenedModalType] = useState<OpenedModalType | undefined>(undefined);

    console.log('Default city', defaultCity);

    const {isSignedIn} = useAuth();
    const {user, userFetchStatus} = useUser();

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            try {
                setCountriesFetchStatus('loading');

                const countries = await getCountries(abortController.signal);

                setCountriesList(countries);

                setCountriesFetchStatus('success');
            } catch (error) {
                Logger.error('Cannot fetch counties', error);
                setCountriesFetchStatus('error');
            }
        })();

        void fetchCities(undefined, abortController.signal);

        return () => abortController.abort();
    }, [setCountriesFetchStatus]);

    useEffect(() => {
        if(isSignedIn) {
            // TODO make sure that user is fetched at this point
            if(user?.defaultCity) {
                setOpenedModalType(undefined);
                setDefaultCity(user?.defaultCity);
            } else {
                setOpenedModalType('auth user');
            }
        } else {
            const localStorageCity = LocalStorage.getItem('defaultCity');

            if(localStorageCity) {
                setOpenedModalType(undefined);
                if(cityFetchStatus === 'success' && citiesList.filter(city => city.id === localStorageCity).length !== 1) {
                    LocalStorage.removeItem('defaultCity');
                    setOpenedModalType('unauth user');
                } else {
                    setDefaultCity(localStorageCity);
                }
            } else {
                setOpenedModalType('unauth user');
            }
        }
    }, [isSignedIn, user, userFetchStatus, cityFetchStatus]);

    const fetchCities = useCallback(async (query?: GetCitiesRequestQuery, signal?: GenericAbortSignal) => {
        try {
            setCityFetchStatus('loading');

            const cities = await getCities(query, signal);

            setCitiesList(cities);

            setCityFetchStatus('success');
        } catch (error) {
            Logger.error('Cannot fetch cities', error);
            setCountriesFetchStatus('error');
            throw error;
        }
    }, [setCitiesList, setCityFetchStatus]);

    const openSelectDefaultCityDialog = useCallback(() => {
        if(isSignedIn) {
            setOpenedModalType('auth user');
        } else {
            setOpenedModalType('unauth user');
        }
    }, [isSignedIn]);

    return <ContriesCitiesContext.Provider value={{
        countriesList,
        countriesFetchStatus,
        citiesList,
        cityFetchStatus,
        fetchCities,
        defaultCity,
        setDefautlCity: (city: string) => setDefaultCity(city),
        openSelectDefaultCityDialog
    }}>
        {props.children}
        <SelectDefaultCityDialogAuthUser
            open={openedModalType === 'auth user'}
            onClose={() => setOpenedModalType(undefined)}
            defaultCity={defaultCity}
        />
        <SelectDefaultCityDialogUnauthUser
            open={openedModalType === 'unauth user'}
            onClose={() => setOpenedModalType(undefined)}
            defaultCity={defaultCity}
        />
    </ContriesCitiesContext.Provider>
}