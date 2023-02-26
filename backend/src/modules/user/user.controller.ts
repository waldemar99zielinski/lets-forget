import { Body, Controller, Get, UseGuards, Headers, NotFoundException, Patch, UsePipes, HttpCode, HttpStatus, UseInterceptors, UnauthorizedException} from '@nestjs/common';

import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { USER_ID } from 'src/utils/headers/headersValues';
import { DuplicateKeyViolationInterceptor } from 'src/common/interceptors/DuplicateKeyViolation.interceptor';

import { PatchMeRequestDto, PatchMeRequestSchema } from './dto/PatchMeRequest.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
    private readonly _logger: LoggerInterface;

    constructor (
        private readonly _userService: UserService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(UserController.name);
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    public async getMe(
        @Headers(USER_ID) userId: string,
    ) {
        this._logger.info('Get me request received from user %s', userId);

        const user = await this._userService.getUser(userId);

        if(!user) {
            this._logger.error('Get me request failed, not found user %s', userId);
            throw new UnauthorizedException();
        }

        this._logger.info('Get me request completed from user %s', userId);

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            authStrategy: user.authStrategy,
            defaultCity: user.defaultCity
        };
    }

    @Patch('/me')
    @UseGuards(AuthGuard)
    @UsePipes(new JoiObjectSchemaPipe(PatchMeRequestSchema))
    @UseInterceptors(DuplicateKeyViolationInterceptor)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async patchMe(
        @Headers(USER_ID) userId: string,
        @Body() body: PatchMeRequestDto
    ) {
        this._logger.info('Patch me request received from user %s, body: %o', userId, body);

        const result = await this._userService.patchUser(userId, body);

        console.log('updat result', result);

        this._logger.info('Patch me request completed from user %s, body: %o', userId, body);
    }

    // @Get()
    // public async getUsers() {
    //     throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
    // }

    // @Get(':id')
    // public async getUser(@Param() params, @Res() res: Response) {
    //     try {
    //         this._logger.info('[UserController] Get user with id %s request received', params.id);
        
    //         const user = await this._userService.getUser(params.id);

    //         this._logger.info('[UserController] Get user request completed for id %s', params.id);
        
    //         res.status(HttpStatus.OK).json(user);
    //     }catch(error) {
    //         this._logger.error('[UserController] getUser %o', error);

    //         const httpError = getHttpError(error);

    //         res.status(httpError.code).send(httpError.message);
    //     }
    // }

    // @Delete(':id')
    // public async deleteUser(@Param() params)
    // {
    //     this._logger.info('[UserController] Delete user with id %s request received', params.id);
        
    //     const deleteResult = await this._userService.deleteUser(params.id);

    //     this._logger.info('[UserController] Delete user request completed for id %s', params.id);
    
    //     return deleteResult;
    // }
}