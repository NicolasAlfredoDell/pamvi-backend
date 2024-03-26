import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { GenderOfAnimalsController } from './gender-of-animals.controller';

// Entities
import { GenderOfAnimal } from './entities/gender-of-animal.entity';

// Services
import { GenderOfAnimalsService } from './gender-of-animals.service';

@Module({
  controllers: [
    GenderOfAnimalsController,
  ],
  providers: [
    GenderOfAnimalsService,
  ],
  imports: [
    TypeOrmModule.forFeature([ GenderOfAnimal ]),
  ],
  exports: [
    GenderOfAnimalsService,
  ]
})
export class GenderOfAnimalsModule {}
