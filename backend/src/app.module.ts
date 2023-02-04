import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CityModule } from './modules/city/city.module';
import { CountryModule } from './modules/country/country.module';
import { OfferModule } from './modules/offer/offer.module';
import { OfferTypeModule } from './modules/offer-type/offer-type.module';
import { OfferScheduleModule } from './modules/offer-schedule/offerSchedule.module';
import { PlaceModule } from './modules/place/place.module';
import { UserModule } from './modules/user/user.module';

// Global modules
import { JWTModule } from './utils/jwt/jwt.module';
import { LoggerModule } from './utils/logger';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,

		AuthenticationModule,
		CityModule,
		CountryModule,
		OfferModule,
		OfferTypeModule,
		OfferScheduleModule,
		PlaceModule,
		UserModule,

		JWTModule,
		LoggerModule
	]
})
export class AppModule {}
