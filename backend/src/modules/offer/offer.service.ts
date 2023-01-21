import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Offer, DaysOfTheWeek } from 'src/database/entities/offer/offer.entity';
import { OfferRepository } from 'src/database/repositories/offer.repository';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

import { GetOffersQueryDto } from './dto/GetOffersRequest.dto';

@Injectable()
export class OfferService {
    private readonly _logger: LoggerInterface;

    constructor(
        private readonly _offerRepository: OfferRepository,
        private readonly _loggerService: LoggerService,
        private readonly _config: ConfigService,

    ) {
        this._logger = _loggerService.getLoggerWithLabel(OfferService.name);
    }

    // TODO test it :)
    public async createOffer(newOffer: Omit<Offer, 'id' | 'startsAt' | 'createdAt' | 'updatedAt'>) {
        // if offer passes midnight make sure that next day is also added
        if(newOffer.daysOfTheWeek && newOffer.startTime && newOffer.endTime && newOffer.startTime >= newOffer.endTime) {
            const daysOfTheWeek = newOffer.daysOfTheWeek;
            const withFollowingDays: DaysOfTheWeek[] = daysOfTheWeek;

            daysOfTheWeek.forEach((day) => {
                withFollowingDays.push(DaysOfTheWeek[DaysOfTheWeek[(day+1) % 7]])
            });

            const uniqueDayOfTheWeek = new Set<DaysOfTheWeek>(withFollowingDays);
            
            newOffer.daysOfTheWeek = Array.from(uniqueDayOfTheWeek);
        }

        return this._offerRepository.create(newOffer);
    }

    public async getOffersByQuery(query: GetOffersQueryDto) {
        const maxPageSize = this._config.getOrThrow('query.maxPageSize');
        const pageSize = query.size ? Math.min(maxPageSize, query.size) : maxPageSize;

        const formatedQuery: GetOffersQueryDto = {...query, size: pageSize};

        return this._offerRepository.getByQuery(formatedQuery);
    }

    public async getOffer(id: string) {
        return this._offerRepository.findOneById(id);
    }

    public async deleteOffer(id: string) {
        return this._offerRepository.deleteOneById(id);
    }
}