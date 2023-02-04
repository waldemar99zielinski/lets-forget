import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferScheduleRepository } from 'src/database/repositories/offerSchedule.repository';
import { OfferSchedule } from 'src/database/entities/offer-schedule/offerSchedule.entity';
import { OfferModule } from 'src/modules/offer/offer.module';
import { OfferService } from 'src/modules/offer/offer.service';

import { OfferScheduleControllerV1 } from './offerSchedule.controller.v1';
import { OfferScheduleService } from './offerSchedule.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OfferSchedule]),
        OfferModule
    ],
    controllers: [OfferScheduleControllerV1],
    providers: [
        OfferScheduleRepository,
        OfferScheduleService,
        OfferService
    ],
    exports: [
        OfferScheduleService
    ]
})
export class OfferScheduleModule {}