import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer, DaysOfTheWeek } from 'src/database/entities/offer/offer.entity';
import { GetOffersQueryDto } from 'src/modules/offer/dto/GetOffersRequest.dto';
import { getHoursFormat } from 'src/utils/time/getHourFormat';

import { BaseRepository } from './base.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OfferRepository extends BaseRepository<Offer> {
    constructor (
        @InjectRepository(Offer)
        private readonly _offerRepository: Repository<Offer>,
        private readonly _config: ConfigService
    ) {
        super(_offerRepository);
    }

    public async create(data: Omit<Offer, 'id'| 'startsAt' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const response = await this._offerRepository.insert(data);
        return response.identifiers[0].id;
    }

    public async getByQuery(query: GetOffersQueryDto): Promise<Offer[]> {
        const createQuery = this._offerRepository.createQueryBuilder('o');

        if(query.type) {
            createQuery.andWhere('"type_id" = :type', {type: query.type});
        }

        if(query.priceMax) {
            createQuery.andWhere('"price" <= :price or "price = NULL', {price: query.priceMax});
        }

        //location

        if(query.city) {
            createQuery.leftJoinAndSelect('places', 'p', 'o.place_id = p.id AND p.city_id = :city', {city: query.city});
        }

        // if(query.placeId) {
        //     createQuery.andWhere('"place_id" = :placeId', {placeId: query.placeId});
        // }

        if(query.n && query.s && query.w && query.e) {

            createQuery.andWhere('latitude BETWEEN :minLat AND :maxLat', {
                minLat: query.s,
                maxLat: query.n,
            });

            createQuery.andWhere('longitude BETWEEN :minLng AND :maxLng', {
                minLng: query.w,
                maxLng: query.e
            });
        }

        if(query.date){
            console.log('query date', query.date, query.date.getDay())
            createQuery.andWhere('"starts_at" <= :date', {date: query.date});
            createQuery.andWhere('("ends_at" >= :date OR "ends_at" = NULL)', {date: query.date});
            createQuery.andWhere('(("start_time" = NULL AND "end_time" = NULL) OR ("start_time" <= "end_time" AND "start_time" <= :now AND "end_time" >= :now) OR ("start_time" >= "end_time" AND ("start_time" <= :now OR "end_time" >= :now)))', {now: getHoursFormat(query.date)});
            createQuery.andWhere(':day = any(days_of_the_week)', {day: DaysOfTheWeek[query.date.getDay()]})
        }

        // pagination

        createQuery.orderBy('id', 'ASC');
        createQuery.limit(this._config.get('query.paginationSize'));

        if(query.page)
            createQuery.andWhere('"id" > :id', {id: query.page});

        console.log(createQuery.getQueryAndParameters())

        return createQuery.getRawMany();
    }
}