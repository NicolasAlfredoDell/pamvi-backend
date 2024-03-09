import { Module } from '@nestjs/common';

// Controllers
import { SeedController } from './seed.controller';

// Modules
import { AuthModule } from 'src/auth/auth.module';
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
    UsersModule,
  ],
})
export class SeedModule {}
