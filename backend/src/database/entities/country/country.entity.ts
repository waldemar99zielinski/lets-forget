import { Entity, PrimaryColumn } from "typeorm";

@Entity('countries')
export class Country {
    @PrimaryColumn('text')
    id: string;
}