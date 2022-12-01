import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Offer } from "src/database/entities/offer/offer.entity";

import { BaseRepository } from "./base.repository";

@Injectable()
export class OfferRepository extends BaseRepository<Offer> {
    constructor (
        @InjectRepository(Offer)
        private readonly _offerRepository: Repository<Offer>,
    ) {
        super(_offerRepository);
    }
}