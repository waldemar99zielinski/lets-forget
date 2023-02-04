import { MigrationInterface, QueryRunner } from "typeorm";

import { createCitiesTable } from "../entities/city/city.sql";
import { createCountriesTable } from "../entities/country/country.sql";
import { createOffersTable } from "../entities/offer/offer.sql";
import { createOffersTypeTable } from "../entities/offer-type/offer-type.sql";
import { createOfferScheduleTable } from "../entities/offer-schedule/offerSchedule.sql";
import { createPlacesTable } from "../entities/place/place.sql";
import { createUsersTable } from "../entities/user/user.sql";

export class DataBaseInitMigration1663180462000 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        console.log('Database init migration starts...');

        await queryRunner.query(createCountriesTable);
        await queryRunner.query(createCitiesTable);
        await queryRunner.query(createPlacesTable);

        await queryRunner.query(createUsersTable);

        await queryRunner.query(createOffersTypeTable);
        await queryRunner.query(createOffersTable);
        await queryRunner.query(createOfferScheduleTable);

        console.log('Database init migration finished...');
    }

    async down(queryRunner: QueryRunner) {

    }
}