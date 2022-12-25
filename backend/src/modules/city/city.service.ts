import { Injectable } from '@nestjs/common';

import { City } from 'src/database/entities/city/city.entity';
import { CityRepository } from 'src/database/repositories/city.repository';
import { LoggerService, LoggerInterface } from 'src/utils/logger';


@Injectable()
export class CityService {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _cityRepository: CityRepository,
        private readonly _loggerService: LoggerService
    ) {
        this._logger = _loggerService.getLoggerWithLabel(CityService.name);
    }

    public async createCity(newCity: City) {
        await this._cityRepository.create(newCity);
    }

    public async getCities() {
        return this._cityRepository.findAll();
    }

    public async getCity(id: string) {
        return this._cityRepository.findOneById(id);
    }

    public async deleteCity(id: string) {
        return this._cityRepository.deleteOneById(id);
    }
}