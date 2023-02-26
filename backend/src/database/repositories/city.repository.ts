import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from 'src/database/entities/city/city.entity';

import { BaseRepository } from './base.repository';
import { GetCitiesQueryDto } from 'src/modules/city/dto/GetCities.dto';

@Injectable()
export class CityRepository extends BaseRepository<City> {
    constructor (
        @InjectRepository(City)
        private readonly _cityRepository: Repository<City>,
    ) {
        super(_cityRepository);
    }

    public async getCitesByQuery(query: GetCitiesQueryDto) {
        const createQuery = this._cityRepository.createQueryBuilder();

        if(query.country) {
            createQuery.andWhere('"country_id" = :country', {country: query.country});
        }

        return createQuery.getMany();
    }
}