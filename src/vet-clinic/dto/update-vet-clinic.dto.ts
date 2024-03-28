import { PartialType } from '@nestjs/mapped-types';
import { CreateVetClinicDto } from './create-vet-clinic.dto';

export class UpdateVetClinicDto extends PartialType(CreateVetClinicDto) {}
