import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    UsersModule,
  ]
})
export class AuthModule {}
