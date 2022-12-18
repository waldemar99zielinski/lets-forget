import { Body, Controller, Get, Post, Delete,  HttpStatus, HttpException, HttpCode, UsePipes, UseGuards, Headers, Request} from '@nestjs/common';

import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';

import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { USER_ID } from 'src/utils/headers/headersValues';

@Controller('api/v1/user')
export class UserController {
    private readonly _logger: LoggerInterface

    constructor (
        private readonly _userService: UserService,
        private readonly _loggerService: LoggerService
    ) {
        this._logger =  this._loggerService.getLoggerWithLabel(UserController.name);
    }

    @Get()
    @UseGuards(AuthGuard)
    public authTest(
        @Headers(USER_ID) userId: string,
        @Request() req
    ) {

        return 'good';
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