import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer } from 'src/database/entities/offer/offer.entity';
import { GetOffersQueryDto } from 'src/modules/offer/dto/GetOffersRequest.dto';

import { BaseRepository } from './base.repository';

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

    public async getByQuery(query: GetOffersQueryDto): Promise<Offer[]> {
        const createQuery = this._offerRepository.createQueryBuilder('o');

        if(query.type) {
            createQuery.andWhere('"type_id" = :type', {type: query.type});
        }

        if(query.priceMax) {
            createQuery.andWhere('"price" <= :price', {price: query.priceMax});
        }

        //location

        if(query.city) {
            createQuery.leftJoinAndSelect('places', 'p', 'o.place_id = p.id AND p.city_id = :city', {city: query.city});
        }

        return createQuery.getMany();
    }
}