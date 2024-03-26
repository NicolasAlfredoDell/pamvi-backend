import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controlls
import { ColorsController } from './colors.controller';

// Entities
import { Color } from './entities/color.entity';

// Services
import { ColorsService } from './colors.service';

@Module({
  controllers: [
    ColorsController,
  ],
  providers: [
    ColorsService,
  ],
  imports: [
    TypeOrmModule.forFeature([ Color ]),
  ],
  exports: [
    ColorsService,
  ]
})
export class ColorsModule {}
