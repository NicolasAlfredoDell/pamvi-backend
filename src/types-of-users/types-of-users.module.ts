import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { TypesOfUsersController } from './types-of-users.controller';

// Entities
import { TypesOfUser } from './entities/types-of-user.entity';

// Services
import { TypesOfUsersService } from './types-of-users.service';

@Module({
  controllers: [
    TypesOfUsersController,
  ],
  providers: [
    TypesOfUsersService,
  ],
  imports: [
    TypeOrmModule.forFeature([ TypesOfUser ]),
  ],
  exports: [
    TypesOfUsersService,
  ]
})
export class TypesOfUsersModule {}
