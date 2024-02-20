import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesOfUserDto } from './create-types-of-user.dto';

export class UpdateTypesOfUserDto extends PartialType(CreateTypesOfUserDto) {}
