import { Injectable } from '@nestjs/common';

import { OfferSchedule } from 'src/database/entities/offer-schedule/offerSchedule.entity';
import { OfferScheduleRepository } from 'src/database/repositories/offerSchedule.repository';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

@Injectable()
export class OfferScheduleService {
    private readonly _logger: LoggerInterface;
    constructor(
        private readonly _offerScheduleRepository: OfferScheduleRepository,
        private readonly _loggerService: LoggerService,

    ) {
        this._logger = _loggerService.getLoggerWithLabel(OfferScheduleService.name);
    }

    public async createOfferSchedule(newOfferSchedule: OfferSchedule) {
        return this._offerScheduleRepository.create(newOfferSchedule);
    }

    public async getOfferSchedulesForOfferId(offerId: string) {
        return this._offerScheduleRepository.getOfferSchedulesForOffer(offerId);
    }

    public async deleteOffer(id: string) {
        return this._offerScheduleRepository.deleteOneById(id);
    }
}