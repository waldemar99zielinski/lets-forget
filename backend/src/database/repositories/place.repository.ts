import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Place } from 'src/database/entities/place/place.entity';
import { GetPlacesQueryDto } from 'src/modules/place/dto/GetPlacesRequest.dto';
import { convertKmToDegree } from 'src/utils/coordinates/convertKmToDegree';

import { BaseRepository } from './base.repository';

@Injectable()
export class PlaceRepository extends BaseRepository<Place> {
    constructor (
        @InjectRepository(Place)
        private readonly _placeRepository: Repository<Place>,
    ) {
        super(_placeRepository);
    }

    public async getByQuery(query: GetPlacesQueryDto): Promise<Place[]> {
        const createQuery = this._placeRepository.createQueryBuilder();

        if(query.city) {
            createQuery.andWhere('"city_id" = :city', {city: query.city});
        }

        if(query.name) {
            createQuery.andWhere('"name" like :name', {name: `${query.name}%`});
        }

        if(query.street) {
            createQuery.andWhere('"street" like :street', {street: `${query.street}%`});
        }

        // TODO take edge cases into consideration
        if(query.latitude && query.longitude && query.radius) {

            const minLat = query.latitude - convertKmToDegree(query.radius)
            const maxLat = query.latitude + convertKmToDegree(query.radius)

            createQuery.andWhere('latitude BETWEEN :minLat AND :maxLat', {
                minLat,
                maxLat,
            });

            const minLng = query.longitude - convertKmToDegree(query.radius)
            const maxLng = query.longitude + convertKmToDegree(query.radius)

            createQuery.andWhere('longitude BETWEEN :minLng AND :maxLng', {
                minLng,
                maxLng
            });
        }

        return createQuery.getMany();
    }
}