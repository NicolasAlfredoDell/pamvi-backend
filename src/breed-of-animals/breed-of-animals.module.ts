import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { BreedOfAnimalsController } from './breed-of-animals.controller';

// Entities
import { BreedOfAnimal } from './entities/breed-of-animal.entity';

// Modules
import { SpeciesOfAnimalsModule } from 'src/species-of-animals/species-of-animals.module';

// Services
import { BreedOfAnimalsService } from './breed-of-animals.service';

@Module({
  controllers: [
    BreedOfAnimalsController,
  ],
  providers: [
    BreedOfAnimalsService,
  ],
  imports: [
    SpeciesOfAnimalsModule,
    TypeOrmModule.forFeature([ BreedOfAnimal ]),
  ],
  exports: [
    BreedOfAnimalsService,
  ]
})
export class BreedOfAnimalsModule {}
