import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { OfferRepository } from 'src/database/repositories/offer.repository';
import { OfferSchedule } from 'src/database/entities/offer-schedule/offerSchedule.entity';

import { OfferControllerV1 } from './offer.controller.v1';
import { OfferService } from './offer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Offer, OfferSchedule])
    ],
    controllers: [OfferControllerV1],
    providers: [
        OfferRepository,
        OfferService
    ],
    exports: [
        OfferRepository,
        OfferService
    ]
})
export class OfferModule {}