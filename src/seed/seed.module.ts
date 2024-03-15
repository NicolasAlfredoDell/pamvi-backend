import { Module } from '@nestjs/common';

// Controllers
import { SeedController } from './seed.controller';

// Modules
import { AuthModule } from 'src/auth/auth.module';
import { GenderOfUsersModule } from 'src/gender-of-users/gender-of-users.module';
import { TypesOfUsersModule } from 'src/types-of-users/types-of-users.module';
import { UsersModule } from 'src/users/users.module';

// Services
import { SeedService } from './seed.service';

@Module({
  controllers: [
    SeedController,
  ],
  providers: [
    SeedService,
  ],
  imports: [
    AuthModule,
    GenderOfUsersModule,
    TypesOfUsersModule,
    UsersModule,
  ],
})
export class SeedModule {}
