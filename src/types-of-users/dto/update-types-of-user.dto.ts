import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateTypesOfUserDto } from ".";

export class UpdateTypesOfUserDto extends PartialType(CreateTypesOfUserDto) { }
