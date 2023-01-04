import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { LoggerInterface, LoggerService } from "src/utils/logger";
import { OfferTypeService } from "./offer-type.service";

@Controller('api/v1/offer-type')
export class OfferTypeControllerV1 {
    private readonly _logger: LoggerInterface;

    constructor(
        private readonly _offerTypeService: OfferTypeService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger = this._loggerService.getLoggerWithLabel(OfferTypeControllerV1.name);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getOfferTypes() {
        this._logger.info('Get offer types request received');

        const offerTypes = await this._offerTypeService.getOfferTypes();

        this._logger.info('Get offer types completed');

        return offerTypes;
    }
}