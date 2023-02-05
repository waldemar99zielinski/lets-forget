import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Offer } from '../offer/offer.entity';

export enum DaysOfTheWeek {
    sunday = 0,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
}

@Entity('offer_schedules')
export class OfferSchedule {
    @PrimaryColumn({name: 'offer_id', type: 'uuid'})
    offerId: string;

    // for typeorm
    @ManyToOne(() => Offer, offer => offer.schedules)
    @JoinColumn({name: 'offer_id'})
    offer?: Offer;

    @PrimaryColumn({name: 'day_of_the_week', type: 'enum', enum: DaysOfTheWeek})
    dayOfTheWeek: DaysOfTheWeek;

    @PrimaryColumn({name: 'start_time', type: 'time'})
    startTime: string;

    @PrimaryColumn({name: 'end_time', type: 'time'})
    endTime: string;
}