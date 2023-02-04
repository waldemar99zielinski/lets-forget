export const createOfferScheduleTable = `
    CREATE TYPE days_of_the_week_enum AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

    CREATE TABLE offer_schedules (
        offer_id            uuid NOT NULL,
        day_of_the_week     days_of_the_week_enum NOT NULL,
        start_time          time NOT NULL,
        end_time            time NOT NULL,

        PRIMARY KEY(offer_id, day_of_the_week, start_time, end_time),
        CONSTRAINT fk_offer_schedules_offer 
            FOREIGN KEY (offer_id) 
                REFERENCES offers(id)
    );
`;