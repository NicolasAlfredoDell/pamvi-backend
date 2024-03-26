import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { PetsController } from './pets.controller';

// Entites
import { Pet } from './entities/pet.entity';

// Modules
import { BreedOfAnimalsModule } from 'src/breed-of-animals/breed-of-animals.module';
import { GenderOfAnimalsModule } from 'src/gender-of-animals/gender-of-animals.module';
import { SpeciesOfAnimalsModule } from 'src/species-of-animals/species-of-animals.module';
import { UsersModule } from 'src/users/users.module';

// Services
import { PetsService } from './pets.service';

@Module({
  controllers: [
    PetsController,
  ],
  providers: [
    PetsService,
  ],
  imports: [
    BreedOfAnimalsModule,
    GenderOfAnimalsModule,
    TypeOrmModule.forFeature([ Pet ]),
    SpeciesOfAnimalsModule,
    UsersModule,
  ]
})
export class PetsModule {}
