import { DB } from './database';

export const truncatePlaces = async () => {

    const c = await DB().initialize();

    await c.query(`
        TRUNCATE TABLE "places" CASCADE;
    `);

    await c.destroy();
}
