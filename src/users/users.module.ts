import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './users.controller';

// Entites
import { User, UserImage } from './entities';

// Modules
import { GenderOfUsersModule } from 'src/gender-of-users/gender-of-users.module';

// Services
import { UsersService } from './users.service';

@Module({
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
  ],
  imports: [
    ConfigModule,
    GenderOfUsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ User, UserImage ]),
  ],
  exports: [
    TypeOrmModule.forFeature([ User ]),
    UsersService,
  ]
})
export class UsersModule {}
