import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Country } from "src/database/entities/country/country.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
    constructor (
        @InjectRepository(Country)
        private readonly _countryRepository: Repository<Country>,
    ) {
        super(_countryRepository);
    }
}