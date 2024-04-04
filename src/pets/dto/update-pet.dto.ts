import { PartialType } from '@nestjs/mapped-types';

import { IsBoolean, IsOptional } from 'class-validator';

// DTOs
import { CreatePetDto } from '.';

export class UpdatePetDto extends PartialType(CreatePetDto) {

    @IsBoolean({ message: 'Debe enviar verdadero o falso' })
    @IsOptional()
    isLost?: boolean;

}
