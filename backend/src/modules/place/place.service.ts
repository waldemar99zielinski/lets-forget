import { Injectable } from '@nestjs/common';

import { Place } from 'src/database/entities/place/place.entity';
import { PlaceRepository } from 'src/database/repositories/place.repository';
import { LoggerService, LoggerInterface } from 'src/utils/logger';

import { GetPlacesQueryDto } from './dto/GetPlacesRequest.dto';

@Injectable()
export class PlaceService {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _placeRepository: PlaceRepository,
        private readonly _loggerService: LoggerService
    ) {
        this._logger = _loggerService.getLoggerWithLabel(PlaceService.name);
    }

    public async createPlace(newPlace: Omit<Place, 'id'>) {
        return this._placeRepository.create(newPlace);
    }

    public async getPlacesByQuery(query: GetPlacesQueryDto) {
        return this._placeRepository.getByQuery(query);
    }

    public async getPlace(id: string) {
        return this._placeRepository.findOneById(id);
    }

    public async deletePlace(id: string) {
        return this._placeRepository.deleteOneById(id);
    }
}