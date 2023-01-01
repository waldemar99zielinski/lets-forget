import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PostgresErrorCodes } from 'src/utils/errors/postgresErrorCodes';
import { LoggerService } from 'src/utils/logger';

@Injectable()
export class ForeignKeyViolationInterceptor implements NestInterceptor {
    private _logger = new LoggerService().getLoggerWithLabel(ForeignKeyViolationInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError( (error) => {
                    
                    if(Number(error.code) === PostgresErrorCodes.foreign_key_violation) {
                        this._logger.error(error);
                        throw new BadRequestException();
                    }

                    throw error;
                })
            );
    }
}
