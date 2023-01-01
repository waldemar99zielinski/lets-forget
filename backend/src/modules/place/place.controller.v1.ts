import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseFloatPipe, ParseUUIDPipe, Post, Query, UseInterceptors, UsePipes } from '@nestjs/common';

import { ForeignKeyViolationInterceptor } from 'src/common/interceptors/ForeignKeyViolation.interceptor';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';

import { PlaceService } from './place.service';
import { GetPlacesQueryDto, GetPlacesQuerySchema } from './dto/GetPlacesRequest.dto';
import { PostPlaceRequestDto, PostPlaceRequestSchema } from './dto/PostPlaceRequest.dto';

@Controller('api/v1/place')
export class PlaceControllerV1 {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _placeService: PlaceService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(PlaceControllerV1.name);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPlaces(
        @Query(new JoiObjectSchemaPipe(GetPlacesQuerySchema)) query: GetPlacesQueryDto
    ) {
        this._logger.info('Get request received with query %o', query);

        const places = await this._placeService.getPlacesByQuery(query);

        if(!places.length) {
            this._logger.error('Get request no places found for query %o', query);
            throw new NotFoundException();
        }

        this._logger.info('Get request completed');

        return places;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async getPlaceById(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        this._logger.info('Get request received for id %s', id);

        const place = await this._placeService.getPlace(id);

        if(!place) {
            this._logger.error('Get request cannot find place with id %s', id);
            throw new NotFoundException();
        }

        this._logger.info('Get request completed for id %s', id);

        return place;
    }

    @Post()
    @UsePipes(new JoiObjectSchemaPipe(PostPlaceRequestSchema))
    @UseInterceptors(ForeignKeyViolationInterceptor)
    @HttpCode(HttpStatus.CREATED)
    public async postPlace(
        @Body() place: PostPlaceRequestDto
    ) {
        this._logger.info('Post request received with body %o', place);
        
        const placeId = await this._placeService.createPlace(place);

        this._logger.info('Post request completed');

        return {id: placeId};
    }
}