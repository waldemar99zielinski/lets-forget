import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfferSchedule } from 'src/database/entities/offer-schedule/offerSchedule.entity';

import { BaseRepository } from './base.repository';

@Injectable()
export class OfferScheduleRepository extends BaseRepository<OfferSchedule> {
    constructor (
        @InjectRepository(OfferSchedule)
        private readonly _offerScheduleRepository: Repository<OfferSchedule>,
    ) {
        super(_offerScheduleRepository);
    }

    public async getOfferSchedulesForOffer(offerId: string) {
        const createQuery = this._offerScheduleRepository.createQueryBuilder();

        createQuery.where('offer_id = :offerId', {offerId});

        return createQuery.getMany();
    }
}