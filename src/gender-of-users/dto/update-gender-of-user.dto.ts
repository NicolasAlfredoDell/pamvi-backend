import { PartialType } from '@nestjs/mapped-types';
import { CreateGenderOfUserDto } from './create-gender-of-user.dto';

export class UpdateGenderOfUserDto extends PartialType(CreateGenderOfUserDto) {}
