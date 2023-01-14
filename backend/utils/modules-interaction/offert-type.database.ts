import { faker } from '@faker-js/faker';

import { DB, DBInterface, errorCodes } from './database';

interface CreateOfferType extends DBInterface {
    name?: string;
}

export const createOfferType = async (props: CreateOfferType) => {
    const c = props.c || await DB().initialize();
    const name = props.name || faker.commerce.productName()

    try {
        await c.query(`
            INSERT INTO offers_types values ($1)
        `, [
            name
        ]);
    } catch(error: any) {
        if(error.code !== errorCodes.uniqueViolation)
            throw error;
    }
 
    if(!props.c)
        await c.destroy();

    return name;
}