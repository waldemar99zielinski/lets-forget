import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum DaysOfTheWeek {
    monday = 0,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}

export enum Currency {
    PLN = 'PLN'
}

@Entity('offers')
export class Offer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'place_id', type: 'uuid'})
    placeId: string;

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

    @Column({name: 'days_of_the_week', type: 'enum', enum: DaysOfTheWeek, array: true})
    daysOfTheWeek?: DaysOfTheWeek[];

    @Column({name: 'start_time', type: 'time'})
    startTime?: string;

    @Column({name: 'end_time', type: 'time'})
    endTime?: string;

    @Column({name: 'created_at', type: 'timestamptz'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamptz'})
    updatedAt: Date;
}