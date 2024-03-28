import { Module } from '@nestjs/common';
import { AnimalShelterService } from './animal-shelter.service';
import { AnimalShelterController } from './animal-shelter.controller';

@Module({
  controllers: [AnimalShelterController],
  providers: [AnimalShelterService],
})
export class AnimalShelterModule {}
