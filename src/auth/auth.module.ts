import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// Controllers
import { AuthController } from './auth.controller';

// Modules
import { GenderOfUsersModule } from 'src/gender-of-users/gender-of-users.module';
import { MailsModule } from 'src/mails/mails.module';
import { TokensValidationModule } from 'src/tokens-validation/tokens-validation.module';
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
    GenderOfUsersModule,
    MailsModule,
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
    TokensValidationModule,
    UsersModule,
  ],
  exports: [
    JwtModule,
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
