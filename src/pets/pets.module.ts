import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { PetsController } from './pets.controller';

// Entites
import { Pet } from './entities/pet.entity';

// Modules
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
    TypeOrmModule.forFeature([ Pet ]),
    SpeciesOfAnimalsModule,
    UsersModule,
  ]
})
export class PetsModule {}
