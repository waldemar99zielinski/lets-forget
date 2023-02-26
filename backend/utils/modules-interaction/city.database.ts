import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

import { DB, errorCodes } from './database';
import { createCountry } from './country.database';

interface CreateCityProps
{
    name?: string;
    countryId?: string;
    c?: DataSource;
}

export const createCity = async (props: CreateCityProps) => {
    const c = props.c || await DB().initialize();
    
    const countryId = props.countryId || await createCountry({c});
    const cityName = props.name || faker.word.noun() + faker.datatype.uuid();

    await c.query(`
        INSERT INTO cities values ($1, $2)
    `,[
        cityName,
        countryId
    ]);

    if(!props.c)
        await c.destroy();

    return cityName;
};

export const initializeTestCity = async (cityName = 'Warsaw', countryName = 'Poland') => {
    const c = await DB().initialize();
    
    try
    {
        await createCountry({c, name: countryName});
    }
    catch(error)
    {
        if(error.code !== errorCodes.uniqueViolation)
            throw error;
    }

    try
    {
        await createCity({c, name: cityName, countryId: countryName});
    }
    catch(error)
    {
        if(error.code !== errorCodes.uniqueViolation)
            throw error;
    }

    await c.destroy();

    return {cityName, countryName};
}

const testCitiesData = [
    {country: 'Poland', city: 'Warsaw'},
    {country: 'Poland', city: 'Gdańsk'},
    {country: 'Poland', city: 'Wrocław'},
    {country: 'Poland', city: 'Kraków'},
    {country: 'Poland', city: 'Poznań'},
    {country: 'Germany', city: 'Berlin'},
    {country: 'Germany', city: 'Munich'},
    {country: 'England', city: 'London'},
    {country: 'England', city: 'Manchester'},
    {country: 'France', city: 'Paris'},
    {country: 'France', city: 'Lyon'},
    {country: 'Italy', city: 'Rome'},
    {country: 'Italy', city: 'Milan'},

]

export const initializeTestCities = async () => {
    for(const city of testCitiesData) {
        await initializeTestCity(city.city, city.country);
    }
}