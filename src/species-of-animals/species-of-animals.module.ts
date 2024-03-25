import { Module } from '@nestjs/common';

// Controllers
import { SpeciesOfAnimalsController } from './species-of-animals.controller';

// Entites
import { SpeciesOfAnimals } from './entities/species-of-animal.entity';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { SpeciesOfAnimalsService } from './species-of-animals.service';

@Module({
  controllers: [
    SpeciesOfAnimalsController,
  ],
  providers: [
    SpeciesOfAnimalsService,
  ],
  imports: [
    TypeOrmModule.forFeature([SpeciesOfAnimals]),
  ],
  exports: [
    SpeciesOfAnimalsService,
  ]
})
export class SpeciesOfAnimalsModule {}
