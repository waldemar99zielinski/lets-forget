
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';

interface CoordinatesDistanceKeysValues {
    lat1: string;
    lat2: string;
    lng1: string;
    lng2: string;
}

/**
 * Ensure that CoordinatesDistanceValues are present and have proper format
 */
@Injectable()
export class CoordinatesDistancePipe implements PipeTransform {
    private _coordinatesKeys: CoordinatesDistanceKeysValues;
    private _maxKmDistance: number;
    private _logger = new LoggerService().getLoggerWithLabel(CoordinatesDistancePipe.name);

    constructor(coordinatesKeys: CoordinatesDistanceKeysValues, maxKmDistance: number) {
        this._coordinatesKeys = coordinatesKeys;
        this._maxKmDistance = maxKmDistance;
    }

    // simplified as distance is small
    transform(value: any, metadata: ArgumentMetadata) {
        // https://www.movable-type.co.uk/scripts/latlong.html

        const lat1 = value[this._coordinatesKeys.lat1];
        const lat2 = value[this._coordinatesKeys.lat2];
        const lng1 = value[this._coordinatesKeys.lng1];
        const lng2 = value[this._coordinatesKeys.lng2];

        if(!lat1 || !lat2 || !lng1 || !lng2)
            return value;

        const R = 6371; // in km
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lng2-lng1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in km

        if(d > this._maxKmDistance ) {
            this._logger.error('Coordinates max distance exceeded');
            throw new BadRequestException('Coordinates max distance exceeded');
        }

        return value;
    }
}
