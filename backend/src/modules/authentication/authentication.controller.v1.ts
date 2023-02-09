import {
    Body,
    Controller,
    Post,
    HttpStatus,
    UsePipes,
    HttpException,
    UnauthorizedException,
    HttpCode
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JoiObjectSchemaPipe } from 'src/common/pipes/JoiObjectSchema.pipe';
import { UserService } from 'src/modules/user/user.service';
import { JWTService } from 'src/utils/jwt/jwt.service';
import { LoggerInterface, LoggerService } from 'src/utils/logger/logger.service';
import { PostgresErrorCodes } from 'src/utils/errors/postgresErrorCodes';
import { AuthStrategy } from 'src/database/entities/user/user.entity';
import { MailerService } from 'src/modules/mailer/mailer.service';

import { AuthenticationService } from './authentication.service';
import { GoogleAuthenticationService } from './google.authentication.service';

import { SignUpRequestDto, SignUpRequestSchema } from './dto/SignUpRequest.dto';
import { SignInResponse } from './dto/SignInResponse.dto';
import { SignInRequestDto, SignInRequestSchema } from './dto/SignInRequest.dto';
import { ActivateEmailRequestDto, ActivateEmailRequestSchema } from './dto/ActivateEmailRequest.dto';
import { GoogleAuthRequestDto, GoogleAuthRequestSchema } from './dto/GoogleAuthRequest.dto';

@Controller('api/v1/authentication')
export class AuthenticationControllerV1 {
    private readonly _logger: LoggerInterface
    private readonly _webappBaseUrl: string;

    constructor (
        private readonly _loggerService: LoggerService,
        private readonly _userService: UserService,
        private readonly _authenticationService: AuthenticationService,
        private readonly _jwtService: JWTService,
        private readonly _mailerService: MailerService,
        private readonly _configService: ConfigService,
        private readonly _googleAuthenticationService: GoogleAuthenticationService
    ) {
        this._logger = this._loggerService.getLoggerWithLabel(AuthenticationControllerV1.name);
        this._webappBaseUrl = this._configService.get('webapp.url')
    }

    @Post('/signup')
    @UsePipes(new JoiObjectSchemaPipe(SignUpRequestSchema))
    public async signUpLocal(@Body() body: SignUpRequestDto) {
        this._logger.info('Signup request received with user email %o', body.email);

        const passwordSalt = await this._authenticationService.getSalt();

        const passwordHash = await this._authenticationService.getHash(body.password, passwordSalt);

        let createdUserId: string;

        try {
            createdUserId = await this._userService.createUserLocal({
                email: body.email,
                passwordHash,
                passwordSalt
            }); 

            this._logger.debug('Preparing activation token for email: %s', body.email);

            const activationToken = await this._jwtService.signJWTActivate(createdUserId);

            const activationLink = `${this._webappBaseUrl}/auth/activate?token=${activationToken}`;

            // TODO dodaj html templatke na to
            await this._mailerService.send(
                [{
                    email: body.email
                }],
                'Activation token',
                `Activate your account with link: ${activationLink}`
            );

            this._logger.info(
                'Signup local request completed user created with email %s, id %s', 
                body.email, 
                createdUserId
            );
        }
        catch(error) {
            this._logger.error('Signup local error: %o', error);

            if(error.code === PostgresErrorCodes.uniqueViolation) {
                // TODO handle it
            }

            throw error;
        }
    }

    @Post('/activate')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(new JoiObjectSchemaPipe(ActivateEmailRequestSchema))
    public async activateEmail(@Body() body: ActivateEmailRequestDto) {
        const {isValid, payload} = await this._jwtService.verifyJWTActivate(body.token);

        if(!isValid)
            throw new UnauthorizedException();
        
        this._logger.info('Activate email request received for user %o', payload.sub);

        await this._userService.activateEmailForUserId(payload.sub);

        this._logger.info('Activate email request completed for user %s', payload.sub);
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiObjectSchemaPipe(SignInRequestSchema))
    public async signin(@Body() body: SignInRequestDto): Promise<SignInResponse> {
      
        this._logger.info('Signin request received for user with email %s', body.email);

        const databaseUser = await this._userService.getUserByEmailAndAuthStategy(body.email, AuthStrategy.local);

        if(!databaseUser || !databaseUser.isEmailConfirmed) {
            this._logger.warn('Sign in request fail, user does not exsit or email is not confirmed for %s', body.email);
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const passwordHash = await this._authenticationService.getHash(body.password, databaseUser.passwordSalt);

        if(passwordHash !== databaseUser.passwordHash) {
            this._logger.warn('Sign in request fail, password does not match for %s', body.email);
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = await this._jwtService.signJWTAccess(databaseUser.id);

        this._logger.info('Signin request completed user with email %s', body.email);

        return {
            user: {
                id: databaseUser.id,
                email: databaseUser.email,
                username: databaseUser.username
            },
            token
        };
    }

    
    @Post('/google')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new JoiObjectSchemaPipe(GoogleAuthRequestSchema))
    public async googleAuth(@Body() request: GoogleAuthRequestDto): Promise<SignInResponse>  {

        this._logger.info('googleAuth request received');

        const retrievedUserFromGoogle = await this._googleAuthenticationService.getGoogleAuthUserData(request.token);

        let databaseUser = await this._userService.getUserByEmailAndAuthStategy(retrievedUserFromGoogle.email, AuthStrategy.google);

        // user not present in database
        if(!databaseUser) {
            await this._userService.createUserGoogle({email: retrievedUserFromGoogle.email});
            databaseUser = await this._userService.getUserByEmailAndAuthStategy(retrievedUserFromGoogle.email, AuthStrategy.google);
        }

        const token = await this._jwtService.signJWTAccess(databaseUser.id);

        this._logger.info('Signin googleAuth request completed user with email %s authenticated', retrievedUserFromGoogle.email);

        return {
            user: {
                id: databaseUser.id,
                email: databaseUser.email,
                username: databaseUser.username
            },
            token
        }
    }
}