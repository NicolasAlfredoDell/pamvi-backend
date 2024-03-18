import { PartialType } from '@nestjs/mapped-types';
import { CreateAdversitingDto } from './create-adversiting.dto';

export class UpdateAdversitingDto extends PartialType(CreateAdversitingDto) {}
