import { Injectable } from '@nestjs/common';
import pino from 'pino';
import pretty from 'pino-pretty';

export interface LoggerInterface {
    error: (message: any, ...args: any[]) => void;
    warn: (message: any, ...args: any[]) => void;
    info: (message: any, ...args: any[]) => void;
    debug: (message: any, ...args: any[]) => void;
    trace: (message: any, ...args: any[]) => void;
}

@Injectable()
export class LoggerService implements LoggerInterface{
    private _logger: pino.Logger;

    constructor() {
        const stream = pretty({
            colorize: true,
            sync: true,
            translateTime: 'SYS:standard',
        });

        this._logger = pino(
            {
                level: 'trace',
                base: undefined,
            },
            stream,
        );
    }

    public getLoggerWithLabel(label: string): LoggerInterface {
        return {
            error: (message: any, ...args: any[]) => this._logger.error(`[${label}] ${message}`, ...args),
            warn: (message: any, ...args: any[]) => this._logger.warn(`[${label}] ${message}`, ...args),
            info: (message: any, ...args: any[]) => this._logger.info(`[${label}] ${message}`, ...args),
            debug: (message: any, ...args: any[]) => this._logger.debug(`[${label}] ${message}`, ...args),
            trace: (message: any, ...args: any[]) => this._logger.trace(`[${label}] ${message}`, ...args),
        }
    }

    public error(message: any, ...args: any[]) {
        
        this._logger.error(message, ...args);
    }

    public warn(message: any, ...args: any[]) {
        this._logger.warn(message, ...args);
    }

    public info(message: any, ...args: any[]) {
        this._logger.info(message, ...args);
    }

    public debug(message: any, ...args: any[]) {
        this._logger.debug(message, ...args);
    }

    public trace(message: any, ...args: any[]) {
        this._logger.trace(message, ...args);
    }
}
