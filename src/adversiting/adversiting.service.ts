import { Injectable } from '@nestjs/common';
import { CreateAdversitingDto } from './dto/create-adversiting.dto';
import { UpdateAdversitingDto } from './dto/update-adversiting.dto';

@Injectable()
export class AdversitingService {
  create(createAdversitingDto: CreateAdversitingDto) {
    return 'This action adds a new adversiting';
  }

  findAll() {
    return `This action returns all adversiting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adversiting`;
  }

  update(id: number, updateAdversitingDto: UpdateAdversitingDto) {
    return `This action updates a #${id} adversiting`;
  }

  remove(id: number) {
    return `This action removes a #${id} adversiting`;
  }
}
