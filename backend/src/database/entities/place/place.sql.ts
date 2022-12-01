export const createPlacesTable = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE places (
        id              uuid DEFAULT uuid_generate_v4(),
        city_id         TEXT NOT NULL,

        name            TEXT NOT NULL,

        street          TEXT NOT NULL,
        street_number   TEXT NOT NULL,

        latitude        NUMERIC(8,6) NOT NULL,
        longitude       NUMERIC(9,6) NOT NULL,

        PRIMARY KEY (id),
        CONSTRAINT fk_place_city 
            FOREIGN KEY (city_id) 
                REFERENCES cites(id),
    )
`;