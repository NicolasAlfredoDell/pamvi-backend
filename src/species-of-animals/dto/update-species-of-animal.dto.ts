import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateSpeciesOfAnimalDto } from '.';

export class UpdateSpeciesOfAnimalDto extends PartialType(CreateSpeciesOfAnimalDto) { }
