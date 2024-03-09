import { Module } from '@nestjs/common';

// Controllers
import { GenderOfUsersController } from './gender-of-users.controller';

// Services
import { GenderOfUsersService } from './gender-of-users.service';

@Module({
  controllers: [
    GenderOfUsersController,
  ],
  providers: [
    GenderOfUsersService,
  ],
})
export class GenderOfUsersModule {}
