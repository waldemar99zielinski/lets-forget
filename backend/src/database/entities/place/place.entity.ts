import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'city_id', type: 'text'})
    cityId: string;

    @Column('text')
    name: string;

    @Column('text')
    street: string;

    @Column({name: 'street_number', type: 'text'})
    streetNumber: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;
}