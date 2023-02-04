import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { DaysOfTheWeek } from 'src/database/entities/offer-schedule/offerSchedule.entity';
import { GetOffersQueryDto } from 'src/modules/offer/dto/GetOffersRequest.dto';
import { getHoursFormat } from 'src/utils/time/getHourFormat';

import { BaseRepository } from './base.repository';

export interface OfferRepositoryGetByIdConfig {
    withPlace?: boolean;
    withSchedule?: boolean;
}

@Injectable()
export class OfferRepository extends BaseRepository<Offer> {
    constructor (
        @InjectRepository(Offer)
        private readonly _offerRepository: Repository<Offer>,
    ) {
        super(_offerRepository);
    }

    public async create(data: Omit<Offer, 'id'| 'startsAt' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const response = await this._offerRepository.insert(data);
        return response.identifiers[0].id;
    }

    public async getById(id: string, options: OfferRepositoryGetByIdConfig = {
        withPlace: false,
        withSchedule: false
    }) {

        const createQuery = this._offerRepository.createQueryBuilder('o');

        createQuery.andWhere('o.id = :id', {id});

        if(options.withPlace)
            createQuery.leftJoinAndSelect('o.place', 'place');
        
        if(options.withSchedule)
            createQuery.leftJoinAndSelect('offer_schedules', 'os', 'os.offer_id = o.id');

        return createQuery.getOne();
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

        //TODO pomyśl nad tym tej
        if(query.city) {
            createQuery.leftJoinAndSelect('o.place', 'place', 'place.city_id = :city', {city: query.city});
            // createQuery.leftJoinAndSelect('places', 'p', 'o.place_id = p.id AND p.city_id = :city', {city: query.city});
        }

        if(query.placeId) {
            createQuery.andWhere('"place_id" = :placeId', {placeId: query.placeId});
        }

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
            createQuery.andWhere(':day = any(days_of_the_week)', {day: DaysOfTheWeek[query.date.getDay()]});
            createQuery.andWhere(subQ => {
                subQ.where('"start_time" = NULL AND "end_time" = NULL')
                subQ.orWhere('"start_time" <= "end_time" AND "start_time" <= :now AND "end_time" >= :now AND :day = any(days_of_the_week)')
                subQ.orWhere('"start_time" >= "end_time" AND ("start_time" <= :now OR "end_time" >= :now)')
            })
        }

        // pagination

        if(query.page)
            createQuery.andWhere('o.id > :id', {id: query.page});

        createQuery.orderBy('o.id', 'ASC');
        createQuery.limit(query.size);

        return createQuery.getMany();
    }
}