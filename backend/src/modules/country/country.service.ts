import { Injectable } from '@nestjs/common';

import { Country } from 'src/database/entities/country/country.entity';
import { CountryRepository } from 'src/database/repositories/country.repository';
import { LoggerService, LoggerInterface } from 'src/utils/logger';


@Injectable()
export class CountryService {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _countryRepository: CountryRepository,
        private readonly _loggerService: LoggerService
    ) {
        this._logger = _loggerService.getLoggerWithLabel(CountryService.name);
    }

    public async createCountry(newCountry: Country) {
        await this._countryRepository.create(newCountry);
    }

    public async getCountries() {
        return this._countryRepository.findAll();
    }

    public async getCountry(id: string) {
        return this._countryRepository.findOneById(id);
    }

    public async deleteCountry(id: string) {
        return this._countryRepository.deleteOneById(id);
    }
}