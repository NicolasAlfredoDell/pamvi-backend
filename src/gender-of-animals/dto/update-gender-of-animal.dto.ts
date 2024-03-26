import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateGenderOfAnimalDto } from '.';

export class UpdateGenderOfAnimalDto extends PartialType(CreateGenderOfAnimalDto) {}
