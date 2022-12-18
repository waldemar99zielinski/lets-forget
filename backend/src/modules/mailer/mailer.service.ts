import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NodeMailer from 'nodemailer';

import { LoggerInterface, LoggerService } from 'src/utils/logger';

interface MailRecipient {
    email: string;
    name?: string,
}

@Injectable()
export class MailerService {
    private readonly _logger: LoggerInterface
    private readonly _transporter: NodeMailer.Transporter;
    private readonly _sender: string;

    constructor (
        private readonly _configService: ConfigService,
        private readonly _loggerService: LoggerService,
    ) {
        this._logger = this._loggerService.getLoggerWithLabel(MailerService.name);

        this._transporter = NodeMailer.createTransport({
            host: this._configService.get('mailer.host'),
            port: this._configService.get('mailer.port'),
        });

        this._sender = this._configService.get('mailer.sender')
    }

    public async send(to: MailRecipient[], subject: string, text: string) {
        this._logger.debug('Sending email to %o, subject %s', to, subject);

        await this._transporter.sendMail({
            from: this._sender,
            to: this._formatRecipients(to),
            subject,
            text
        });

        this._logger.debug('Successfuly sent email to %o, subject %s', to, subject);
    }

    private _formatRecipients(recipients: MailRecipient[]) {
        return recipients
            .map((recipient) => `${recipient.name ? recipient.name.concat(' ') : ''}<${recipient.email}>`)
            .join(',');
    }
}