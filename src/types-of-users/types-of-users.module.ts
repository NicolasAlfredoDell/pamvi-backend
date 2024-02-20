import { Module } from '@nestjs/common';
import { TypesOfUsersService } from './types-of-users.service';
import { TypesOfUsersController } from './types-of-users.controller';

@Module({
  controllers: [TypesOfUsersController],
  providers: [TypesOfUsersService],
})
export class TypesOfUsersModule {}
