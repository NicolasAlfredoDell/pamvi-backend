import { Module } from '@nestjs/common';
import { VetClinicService } from './vet-clinic.service';
import { VetClinicController } from './vet-clinic.controller';

@Module({
  controllers: [VetClinicController],
  providers: [VetClinicService],
})
export class VetClinicModule {}
