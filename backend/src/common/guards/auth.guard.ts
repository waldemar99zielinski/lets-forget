import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";

import { JWTService } from "src/utils/jwt/jwt.service";
import { USER_ID } from "src/utils/headers/headersValues";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _jwtService: JWTService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader: string = request.headers.authorization;

        if(!authHeader)
            return false;

        const token = authHeader.split('Bearer ')[1];
        
        const {isValid, payload} = await this._jwtService.verifyJWTAccess(token);

        if(!isValid)
            return false;

        request.headers[USER_ID] = payload.sub;

        return true;
    }
}