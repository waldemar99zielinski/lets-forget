import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { City } from "src/database/entities/city/city.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class CityRepository extends BaseRepository<City> {
    constructor (
        @InjectRepository(City)
        private readonly _cityRepository: Repository<City>,
    ) {
        super(_cityRepository);
    }
}