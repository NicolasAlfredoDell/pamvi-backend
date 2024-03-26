import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateBreedOfAnimalDto } from '.';

export class UpdateBreedOfAnimalDto extends PartialType(CreateBreedOfAnimalDto) { }
