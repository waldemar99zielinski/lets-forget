type LoggerMethod = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export class Logger {
    public static error(...args: any) {
        this.useConsole('error', ...args);
    }

    public static warn(...args: any) {
        this.useConsole('warn', ...args);
    }

    public static info(...args: any) {
        this.useConsole('info', ...args);
    }

    public static debug(...args: any) {
        this.useConsole('debug', ...args);
    }

    public static trace(...args: any) {
        this.useConsole('trace', ...args);
    }

    private static useConsole(method: LoggerMethod, ...args: any){
        console[method](...args);
    }
}