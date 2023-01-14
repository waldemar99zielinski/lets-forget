import { Injectable } from '@nestjs/common';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { OfferRepository } from 'src/database/repositories/offer.repository';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

import { GetOffersQueryDto } from './dto/GetOffersRequest.dto';

@Injectable()
export class OfferService {
    private readonly _logger: LoggerInterface;

    constructor(
        private readonly _offerRepository: OfferRepository,
        private readonly _loggerService: LoggerService
    ) {
        this._logger = _loggerService.getLoggerWithLabel(OfferService.name);
    }

    public async createOffer(newOffer: Omit<Offer, 'id' | 'startsAt' | 'createdAt' | 'updatedAt'>) {
        return this._offerRepository.create(newOffer);
    }

    public async getOffersByQuery(query: GetOffersQueryDto) {
        return this._offerRepository.getByQuery(query);
    }

    public async getOffer(id: string) {
        return this._offerRepository.findOneById(id);
    }

    public async deleteOffer(id: string) {
        return this._offerRepository.deleteOneById(id);
    }
}