import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataBaseInitMigration1663180462000 } from './migrations';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                entities: ['dist/**/*.entity.{ts,js}'],
                synchronize: false,
                migrationsRun: 
                    configService.get('app.nodeEnv') === 'development' 
                    && configService.get('app.dataBaseDevInit') === 'TRUE'
                    ? true : false,
                migrations: [
                    DataBaseInitMigration1663180462000
                ],
                autoLoadEntities: false
            })
        })
    ],
})
export class DatabaseModule {}
