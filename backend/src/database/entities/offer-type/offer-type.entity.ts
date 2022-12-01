import { Entity, PrimaryColumn } from "typeorm";

@Entity('offers_types')
export class OfferType {
    @PrimaryColumn('text')
    id: string;
}