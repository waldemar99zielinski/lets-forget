import { Body, Controller, Get, Headers, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { ForeignKeyViolationInterceptor } from 'src/common/interceptors/ForeignKeyViolation.interceptor';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { CoordinatesDistancePipe } from 'src/common/pipes/CoordinatesDistance.pipe';
import { USER_ID } from 'src/utils/headers/headersValues';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

import { OfferService } from './offer.service';
import { GetOffersQueryDto, GetOffersQuerySchema } from './dto/GetOffersRequest.dto';
import { PostOfferRequestDto, PostOfferRequestSchema } from './dto/PostOfferRequest.dto';

@Controller('api/v1/offer')
export class OfferControllerV1 {
    private readonly _logger: LoggerInterface;
    private readonly _max

    constructor(
        private readonly _offerService: OfferService,
        private readonly _loggerService: LoggerService,
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(OfferControllerV1.name);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getOffersWithQuery(
        @Query(
            new JoiObjectSchemaPipe(GetOffersQuerySchema),
            new CoordinatesDistancePipe({lat1: 'n', lat2: 's', lng1: 'e', lng2: 'w'}, 20)
        ) query: GetOffersQueryDto
    ) {
        this._logger.info('Get request received with query %o', query);

        const offers = await this._offerService.getOffersByQuery(query);

        console.log('offers', offers);

        this._logger.info('Get request completed with query %o', query);

        return offers;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async getOfferById(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        this._logger.info('Get request received for id %s', id);

        const offer = await this._offerService.getOffer(id);

        if(!offer) {
            this._logger.error('Get request cannot find offer with id %s', id);
            throw new NotFoundException();
        }

        this._logger.info('Get request completed for id %s', id);

        return offer;
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new JoiObjectSchemaPipe(PostOfferRequestSchema))
    @UseInterceptors(ForeignKeyViolationInterceptor)
    @HttpCode(HttpStatus.CREATED)
    public async createOffer(
        @Headers(USER_ID) userId: string,
        @Body() body: PostOfferRequestDto
    ) {
        this._logger.info('Post request received with body %o', body);

        const offerId = await this._offerService.createOffer({
            ...body,
            authorId: userId
        });

        this._logger.info('Post request completed with body %o', body);

        return {id: offerId};
    }
}