import { LoggerService } from './logger.service';
import pino from 'pino';
import pretty from 'pino-pretty';

jest.mock('pino');
jest.mock('pino-pretty');

(pino as any).mockImplementation(() => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
}));

describe('LoggerService', () => {
    let loggerService: LoggerService;

    const message = 'message';
    const args = ['arg1', 'arg2'];

    beforeEach(() => {
        expect.hasAssertions();

        loggerService = new LoggerService();
    });

    const loggerMethods = ['error', 'warn', 'info', 'debug', 'trace'].forEach((method) => {
        it(method, () => {
            const spy = jest.spyOn(loggerService, method as never);

            loggerService[method](message, args);

            expect(spy).toBeCalledWith(message, args);
        });
    });
});
