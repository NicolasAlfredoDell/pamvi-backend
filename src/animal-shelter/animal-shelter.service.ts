import { Injectable } from '@nestjs/common';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';

@Injectable()
export class AnimalShelterService {
  create(createAnimalShelterDto: CreateAnimalShelterDto) {
    return 'This action adds a new animalShelter';
  }

  findAll() {
    return `This action returns all animalShelter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalShelter`;
  }

  update(id: number, updateAnimalShelterDto: UpdateAnimalShelterDto) {
    return `This action updates a #${id} animalShelter`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalShelter`;
  }
}
