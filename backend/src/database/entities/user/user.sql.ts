export const createUsersTable = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TYPE user_authstrategy_enum AS ENUM('local', 'google', 'facebook');

    CREATE TABLE "users" (
        id                  uuid DEFAULT uuid_generate_v4(),

        email               TEXT NOT NULL,
        is_email_confirmed  BOOLEAN NOT NULL DEFAULT FALSE,
        username           TEXT NOT NULL DEFAULT uuid_generate_v4(),
        
        password_hash       TEXT DEFAULT NULL,
        password_salt       TEXT DEFAULT NULL,
        auth_strategy       user_authstrategy_enum NOT NULL,

        PRIMARY KEY (id),
        CONSTRAINT user_unique_email_auth_strategy_constraint UNIQUE(email, auth_strategy),
        UNIQUE(username)
    );
`;