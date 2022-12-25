import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/database/entities/city/city.entity";
import { CityRepository } from "src/database/repositories/city.repository";
import { CityControllerV1 } from "./city.controller.v1";
import { CityService } from "./city.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([City]),
    ],
    controllers: [CityControllerV1],
    providers: [
        CityRepository,
        CityService
    ],
    exports: [
        CityService
    ]
})
export class CityModule {}