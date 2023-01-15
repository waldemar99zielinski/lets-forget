import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PostgresErrorCodes } from 'src/utils/errors/postgresErrorCodes';
import { LoggerService } from 'src/utils/logger';

@Injectable()
export class DuplicateKeyViolationInterceptor implements NestInterceptor {
    private _logger = new LoggerService().getLoggerWithLabel(DuplicateKeyViolationInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError( (error) => {
                    if(Number(error.code) === PostgresErrorCodes.uniqueViolation) {
                        this._logger.error(error);
                        throw new ConflictException();
                    }

                    throw error;
                })
            );
    }
}
