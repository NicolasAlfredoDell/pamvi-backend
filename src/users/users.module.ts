import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// Controllers
import { UsersController } from './users.controller';

// Entites
import { User, UserImage } from './entities';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';

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
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ User, UserImage ]),
  ],
  exports: [
    TypeOrmModule.forFeature([ User ]),
    UsersService,
  ]
})
export class UsersModule {}
