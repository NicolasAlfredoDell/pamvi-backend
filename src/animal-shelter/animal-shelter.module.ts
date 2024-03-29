import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { AnimalShelterController } from './animal-shelter.controller';

// Entities
import { AnimalShelter } from './entities/animal-shelter.entity';

// Services
import { AnimalShelterService } from './animal-shelter.service';

@Module({
  controllers: [
    AnimalShelterController,
  ],
  providers: [
    AnimalShelterService,
  ],
  imports: [
    TypeOrmModule.forFeature([ AnimalShelter ]),
  ],
})
export class AnimalShelterModule {}
