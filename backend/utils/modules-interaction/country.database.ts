import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

import { DB } from './database';

interface CreateCountryProps
{
    name?: string;
    c?: DataSource; 
}

export const createCountry = async (props: CreateCountryProps) => {
    const countryName = props.name || faker.word.noun() + faker.datatype.uuid();

    const c = props.c || await DB().initialize();

    await c.query(`
        INSERT INTO countries values ($1);
    `,[
        countryName
    ]);

    if(!props.c)
        await c.destroy();

    return countryName;
}
