import { Injectable } from "@nestjs/common";
import { OfferType } from "src/database/entities/offer-type/offer-type.entity";
import { OfferTypeRepository } from "src/database/repositories/offerType.repository";

@Injectable()
export class OfferTypeService {
    constructor(
        private readonly _offerTypeRepository: OfferTypeRepository
    ) {}

    public async createOfferType(newOfferType: OfferType) {
        return this._offerTypeRepository.create(newOfferType);
    }

    public async getOfferTypes() {
        return this._offerTypeRepository.findAll();
    }
}