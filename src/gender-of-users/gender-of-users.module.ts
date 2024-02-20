import { Module } from '@nestjs/common';
import { GenderOfUsersService } from './gender-of-users.service';
import { GenderOfUsersController } from './gender-of-users.controller';

@Module({
  controllers: [GenderOfUsersController],
  providers: [GenderOfUsersService],
})
export class GenderOfUsersModule {}
