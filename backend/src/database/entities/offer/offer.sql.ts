export const createOffersTable = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TYPE days_of_the_week_enum AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

    CREATE TYPE currency_enum AS ENUM('PLN');

    CREATE TABLE offers (
        id                  uuid DEFAULT uuid_generate_v4(),
        place_id            uuid NOT NULL,
        author_id           uuid NOT NULL,
        type_id             text NOT NULL,

        title               text NOT NULL,
        description         text,

        price               numeric,
        currency            currency_enum DEFAULT 'PLN',

        starts_at           timestamptz NOT NULL DEFAULT NOW(),
        ends_at             timestamptz,

        days_of_the_week    days_of_the_week_enum[],

        start_time          time,
        end_time            time,

        created_at          timestamptz NOT NULL DEFAULT NOW(),
        updated_at          timestamptz NOT NULL DEFAULT NOW(),

        PRIMARY KEY (id),
        CONSTRAINT fk_offer_place 
            FOREIGN KEY (place_id) 
                REFERENCES places(id),
        CONSTRAINT fk_offer_user
            FOREIGN KEY (author_id) 
                REFERENCES users(id),
        CONSTRAINT fk_offer_type
            FOREIGN KEY (type_id) 
                REFERENCES offers_types(id)
    );
`;
