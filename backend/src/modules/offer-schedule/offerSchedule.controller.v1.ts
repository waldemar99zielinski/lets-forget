import { BadRequestException, Body, Controller, ForbiddenException, Get, Headers, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { ForeignKeyViolationInterceptor } from 'src/common/interceptors/ForeignKeyViolation.interceptor';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { USER_ID } from 'src/utils/headers/headersValues';
import { OfferService } from 'src/modules/offer/offer.service';
import { LoggerInterface, LoggerService } from 'src/utils/logger';

import { OfferScheduleService } from './offerSchedule.service';
import { GetOfferSchedulesQueryDto, GetOffersQuerySchema } from './dto/GetOfferScheduleRequest.dto';
import { PostOfferScheduleRequestDto, PostOfferScheduleRequestSchema } from './dto/PostOfferScheduleRequest.dto';

@Controller('api/v1/offer-schedule')
export class OfferScheduleControllerV1 {
    private readonly _logger: LoggerInterface;

    constructor(
        private readonly _offerScheduleService: OfferScheduleService,
        private readonly _offerService: OfferService,
        private readonly _loggerService: LoggerService,
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(OfferScheduleControllerV1.name);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async getOfferScheduleByOfferId(
        @Query(
            new JoiObjectSchemaPipe(GetOffersQuerySchema)
        ) query: GetOfferSchedulesQueryDto
    ) {
        this._logger.info('Get request received for offer id %s', query.offerId);

        const offerSchedules = await this._offerScheduleService.getOfferSchedulesForOfferId(query.offerId);

        this._logger.info('Get request completed for id %s', query.offerId);

        return offerSchedules;
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new JoiObjectSchemaPipe(PostOfferScheduleRequestSchema))
    @UseInterceptors(ForeignKeyViolationInterceptor)
    @HttpCode(HttpStatus.CREATED)
    public async createOffer(
        @Headers(USER_ID) userId: string,
        @Body() body: PostOfferScheduleRequestDto
    ) {
        this._logger.info('Post request received with body %o', body);

        const offerToAddSchedule = await this._offerService.getOffer(body.offerId);

        if(!offerToAddSchedule)
            throw new BadRequestException();

        if(offerToAddSchedule.authorId !== userId)
            throw new ForbiddenException();

        console.log('offer schedule after checks')

        // TODO check if schedules are not overlapping each

        await this._offerScheduleService.createOfferSchedule(body);

        this._logger.info('Post request completed with body %o', body);

        return;
    }
}