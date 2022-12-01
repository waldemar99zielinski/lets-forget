import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OfferType } from "src/database/entities/offer-type/offer-type.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class OfferTypeRepository extends BaseRepository<OfferType> {
    constructor (
        @InjectRepository(OfferType)
        private readonly _offerTypeRepository: Repository<OfferType>,
    ) {
        super(_offerTypeRepository);
    }
}