import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';

import { CityService } from './city.service';

@Controller('api/v1/city')
export class CityControllerV1 {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _cityService: CityService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(CityControllerV1.name);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getCities() {
        this._logger.info('Get request received');

        const cities = await this._cityService.getCities();

        this._logger.info('Get request completed');

        return cities;
    }
}