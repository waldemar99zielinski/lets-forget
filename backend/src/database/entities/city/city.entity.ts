import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cities') 
export class City {
    @PrimaryColumn('text')
    id: string;

    @Column({name: 'country_id', type: 'text'})
    countryId: string;
}