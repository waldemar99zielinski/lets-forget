import { Body, Controller, Get, Post, Patch, Delete, Res, Param, HttpStatus, UsePipes, HttpException, HttpCode} from '@nestjs/common';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { UserService } from 'src/modules/user/user.service';
import { JWTService } from 'src/utils/jwt/jwt.service';
import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';

import { AuthenticationService } from './authentication.service';

// import { GoogleAuthenticationService } from './google.authentication.service';

import { SignUpRequestDto, SignUpRequestSchema } from './dto/SignUpRequest.dto';
import { SignInRequestDto, SignInRequestSchema } from './dto/SignInRequest.dto';
import { AuthStrategy } from 'src/database/entities/user/user.entity';
import { MailerService } from '../mailer/mailer.service';

@Controller('api/v1/authentication')
export class AuthenticationController {
    private readonly _logger: LoggerInterface

    constructor (
        private readonly _loggerService: LoggerService,
        private readonly _userService: UserService,
        private readonly _authenticationService: AuthenticationService,
        private readonly _jwtService: JWTService,
        private readonly _mailerService: MailerService
        // private readonly _googleAuthenticationService: GoogleAuthenticationService
    ) {
        this._logger = this._loggerService.getLoggerWithLabel(AuthenticationController.name);
    }

    @Post('/signup')
    @UsePipes(new JoiObjectSchemaPipe(SignUpRequestSchema))
    public async signUpLocal(@Body() body: SignUpRequestDto) {

            this._logger.info('Signup request received with user email %o', body.email);

            const passwordSalt = await this._authenticationService.getSalt();

            const passwordHash = await this._authenticationService.getHash(body.password, passwordSalt);

            const createdUserId = await this._userService.createUserLocal({
                email: body.email,
                passwordHash,
                passwordSalt
            });

            this._logger.info(
                'Signup local request completed user created with email %s, id %s', 
                body.email, 
                createdUserId
            );
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiObjectSchemaPipe(SignInRequestSchema))
    public async signin(@Body() body: SignInRequestDto) {
      
        this._logger.info('Signin request received for user with email %s', body.email);

        const databaseUser = await this._userService.getUserByEmailAndAuthStategy(body.email, AuthStrategy.local);

        if(!databaseUser)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        const passwordHash = await this._authenticationService.getHash(body.password, databaseUser.passwordSalt);

        if(passwordHash !== databaseUser.passwordHash)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        const token = await this._jwtService.signJWTAccess(databaseUser.id);

        this._logger.info('Signin request completed user with email %s', body.email);

        return {
            user: {
                email: databaseUser.email,
                username: databaseUser.username
            },
            token
        };
    }
    
    // @Post('/google')
    // @HttpStatus(HttpStatus.OK)
    // public async googleAuth(@Body() request: GoogleAuthRequestDto, @Res() res: Response) {

    //     this._logger.info('googleAuth request received with request %o', request);

    //     const retrievedUserFromGoogle = await this._googleAuthenticationService.getGoogleAuthUserData(request.token);

    //     const databaseUser = await this._userService.getUserByEmailAndAuthStategy(retrievedUserFromGoogle.email, AuthStrategy.google);
    //     let userId = databaseUser ? databaseUser.id : null;

    //     // user not present in database
    //     if(!userId)
    //         userId = await this._userService.createUser(retrievedUserFromGoogle as User);

    //     const token = await this._authenticationService.signJWT(userId);

    //     const userProto: UserProtoDto = {
    //         id: userId,
    //         email: retrievedUserFromGoogle.email,
    //         firstName: retrievedUserFromGoogle.firstName,
    //         lastName: retrievedUserFromGoogle.lastName,
    //     };

    //     this._logger.info('Signin googleAuth request completed user with email %s authenticated', retrievedUserFromGoogle.email);

    //     res.status(HttpStatus.OK).json({user: userProto, token});
    // }
}