import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { OfferRepository } from 'src/database/repositories/offer.repository';

import { OfferControllerV1 } from './offer.controller.v1';
import { OfferService } from './offer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Offer])
    ],
    controllers: [OfferControllerV1],
    providers: [
        OfferRepository,
        OfferService
    ],
    exports: [
        OfferService
    ]
})
export class OfferModule {}