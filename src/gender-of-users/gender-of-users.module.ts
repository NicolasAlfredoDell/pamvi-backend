import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { GenderOfUsersController } from './gender-of-users.controller';

// Entities
import { GenderOfUser } from './entities/gender-of-user.entity';

// Services
import { GenderOfUsersService } from './gender-of-users.service';

@Module({
  controllers: [
    GenderOfUsersController,
  ],
  providers: [
    GenderOfUsersService,
  ],
  imports: [
    TypeOrmModule.forFeature([ GenderOfUser ]),
  ],
  exports: [
    GenderOfUsersService,
  ]
})
export class GenderOfUsersModule {}
