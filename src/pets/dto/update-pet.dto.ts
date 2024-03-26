import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreatePetDto } from '.';

export class UpdatePetDto extends PartialType(CreatePetDto) { }
