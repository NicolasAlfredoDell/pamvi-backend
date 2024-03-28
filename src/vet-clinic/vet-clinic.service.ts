import { Injectable } from '@nestjs/common';
import { CreateVetClinicDto } from './dto/create-vet-clinic.dto';
import { UpdateVetClinicDto } from './dto/update-vet-clinic.dto';

@Injectable()
export class VetClinicService {
  create(createVetClinicDto: CreateVetClinicDto) {
    return 'This action adds a new vetClinic';
  }

  findAll() {
    return `This action returns all vetClinic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vetClinic`;
  }

  update(id: number, updateVetClinicDto: UpdateVetClinicDto) {
    return `This action updates a #${id} vetClinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} vetClinic`;
  }
}
