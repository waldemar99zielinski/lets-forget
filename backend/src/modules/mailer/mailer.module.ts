import { Module } from "@nestjs/common";
import { LoggerModule } from "src/utils/logger";
import { MailerService } from "./mailer.service";

@Module({
    imports: [
        LoggerModule
    ],
    providers: [
        MailerService
    ],
    exports: [
        MailerService
    ]
})
export class MailerModule {}