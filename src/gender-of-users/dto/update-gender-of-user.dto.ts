import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateGenderOfUserDto } from '.';

export class UpdateGenderOfUserDto extends PartialType(CreateGenderOfUserDto) { }