import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiObjectSchemaPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            // TODO: czy dawac wiadomosc dla api?
            throw new BadRequestException({
                error: 'Bad request',
                message: error.message
            });
        }

        return value;
    }
}
