import { DB, DBInterface } from './database';

export interface ActivateUserEmailProps extends DBInterface {
    email: string;
}

export const activateUserEmail = async (props: ActivateUserEmailProps) => {
    const c = props.c || await DB().initialize();

    await c.query(`
        UPDATE users
        SET is_email_confirmed = true
        WHERE email = $1
    `, [
        props.email
    ]);

    if(!props.c)
        await c.destroy();
}