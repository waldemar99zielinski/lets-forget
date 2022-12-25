import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country } from 'src/database/entities/country/country.entity';
import { CountryRepository } from 'src/database/repositories/country.repository';

import { CountryControllerV1 } from './country.controller.v1';
import { CountryService } from './country.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Country]),
    ],
    controllers: [CountryControllerV1],
    providers: [
        CountryRepository,
        CountryService,
    ],
    exports: [
        CountryService
    ]
})
export class CountryModule {}