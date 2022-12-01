export const createCitiesTable = `
    CREATE TABLE cities (
        id              TEXT NOT NULL,
        country_id      TEXT NOT NULL,

        PRIMARY KEY (id),
        CONSTRAINT fk_city_country
            FOREIGN KEY (country_id)
                REFERENCES countries(id)
    )
`;