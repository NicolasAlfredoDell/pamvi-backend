import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// Controllers
import { AuthController } from './auth.controller';

// Modules
import { UsersModule } from 'src/users/users.module';

// Services
import { AuthService } from './auth.service';

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      inject: [
        ConfigService,
      ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          }
        }
      }
    }),
    UsersModule,
  ],
  exports: [
    JwtModule,
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
