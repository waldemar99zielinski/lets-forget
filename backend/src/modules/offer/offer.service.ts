import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { OfferRepository, OfferRepositoryGetByIdConfig } from 'src/database/repositories/offer.repository';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

import { GetOffersQueryDto } from './dto/GetOffersRequest.dto';

@Injectable()
export class OfferService {
    private readonly _logger: LoggerInterface;
    private readonly _maxPageSize: number;

    constructor(
        private readonly _offerRepository: OfferRepository,
        private readonly _loggerService: LoggerService,
        private readonly _config: ConfigService,

    ) {
        this._logger = _loggerService.getLoggerWithLabel(OfferService.name);
        this._maxPageSize = this._config.getOrThrow('query.maxPageSize');
    }

    public async createOffer(newOffer: Omit<Offer, 'id' | 'startsAt' | 'createdAt' | 'updatedAt'>) {
        return this._offerRepository.create(newOffer);
    }

    public async getOffersByQuery(query: GetOffersQueryDto) {
        const pageSize = query.size ? Math.min(this._maxPageSize, query.size) : this._maxPageSize;

        const formatedQuery: GetOffersQueryDto = {...query, size: pageSize};

        return this._offerRepository.getByQuery(formatedQuery);
    }

    public async getOffer(id: string, config?: OfferRepositoryGetByIdConfig) {
        return this._offerRepository.getById(id, config);
    }

    public async deleteOffer(id: string) {
        return this._offerRepository.deleteOneById(id);
    }
}