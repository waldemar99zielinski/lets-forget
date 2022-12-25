import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';

import { CountryService } from './country.service';

@Controller('api/v1/country')
export class CountryControllerV1 {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _countryService: CountryService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(CountryControllerV1.name);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getCountries() {
        this._logger.info('Get request received');

        const countries = await this._countryService.getCountries();

        this._logger.info('Get request completed');

        return countries;
    }
}