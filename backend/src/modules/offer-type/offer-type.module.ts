import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferType } from 'src/database/entities/offer-type/offer-type.entity';
import { OfferTypeRepository } from 'src/database/repositories/offerType.repository';

import { OfferTypeControllerV1 } from './offer-type.controller.v1';
import { OfferTypeService } from './offer-type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OfferType])
    ],
    controllers: [
        OfferTypeControllerV1
    ],
    providers: [
        OfferTypeRepository,
        OfferTypeService
    ],
    exports: [
        OfferTypeService
    ]
})
export class OfferTypeModule {}