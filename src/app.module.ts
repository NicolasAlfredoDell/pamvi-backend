import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

// Config
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

// Modules
import { AdversitingModule } from './adversiting/adversiting.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { GenderOfUsersModule } from './gender-of-users/gender-of-users.module';
import { MailsModule } from './mails/mails.module';
import { PetsModule } from './pets/pets.module';
import { SeedModule } from './seed/seed.module';
import { TokensValidationModule } from './tokens-validation/tokens-validation.module';
import { TypesOfUsersModule } from './types-of-users/types-of-users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    AdversitingModule,
    AuthModule,
    CommonModule,
    FilesModule,
    GenderOfUsersModule,
    MailsModule,
    PetsModule,
    SeedModule,
    TokensValidationModule,
    TypesOfUsersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
