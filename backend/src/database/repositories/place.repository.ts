import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Place } from "src/database/entities/place/place.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class PlaceRepository extends BaseRepository<Place> {
    constructor (
        @InjectRepository(Place)
        private readonly _placeRepository: Repository<Place>,
    ) {
        super(_placeRepository);
    }
}