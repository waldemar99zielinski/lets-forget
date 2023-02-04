import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from 'src/database/entities/place/place.entity';
import { OfferSchedule } from 'src/database/entities/offer-schedule/offerSchedule.entity';

export enum Currency {
    PLN = 'PLN'
}

@Entity('offers')
export class Offer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'place_id', type: 'uuid'})
    placeId: string;

    @ManyToOne(() => Place, place => place.id)
    @JoinColumn({name: 'place_id'})
    place?: Place;

    @Column({name: 'author_id', type: 'uuid'})
    authorId: string;

    @Column({name: 'type_id', type: 'text'})
    typeId: string;

    @Column('text')
    title: string;

    @Column('text')
    description?: string;

    @Column('numeric')
    price?: number;

    @Column({type: 'enum', enum: Currency})
    currency?: Currency;

    @Column({name: 'starts_at', type: 'timestamptz'})
    startsAt: Date;

    @Column({name: 'ends_at', type: 'timestamptz'})
    endsAt?: Date;

    @Column({name: 'created_at', type: 'timestamptz'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamptz'})
    updatedAt: Date;

    // for typeorm
    @OneToMany(() => OfferSchedule, offerSchedule => offerSchedule['offer_id'])
    @JoinColumn({name: 'offer_id'})
    schedules?: OfferSchedule[];
}