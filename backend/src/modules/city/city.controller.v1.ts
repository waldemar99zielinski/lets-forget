import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';

import { CityService } from './city.service';
import { GetCitiesQueryDto, GetCitiesQuerySchema } from './dto/GetCities.dto';

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
    public async getCities(
        @Query(
            new JoiObjectSchemaPipe(GetCitiesQuerySchema)
        ) query: GetCitiesQueryDto
    ) {
        this._logger.info('Get request received');

        const cities = await this._cityService.getCities(query);

        this._logger.info('Get request completed');

        return cities;
    }
}