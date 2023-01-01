import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Place } from "src/database/entities/place/place.entity";
import { PlaceRepository } from "src/database/repositories/place.repository";
import { PlaceControllerV1 } from "./place.controller.v1";
import { PlaceService } from "./place.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Place]),
    ],
    controllers: [PlaceControllerV1],
    providers: [
        PlaceRepository,
        PlaceService
    ],
    exports: [
        PlaceService
    ]
})
export class PlaceModule {}