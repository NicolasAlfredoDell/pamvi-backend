import { join } from 'path';

import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
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
import { ScheduleTasksModule } from './schedule-tasks/schedule-tasks.module';
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

    //* Agregar en la carpeta config los defaults
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async(configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get<string>('MAIL_HOST'),
    //       port: configService.get<string>('MAIL_PORT'),
    //       secure: false,
    //       auth: {
    //         user: configService.get<string>('MAIL_USER'),
    //         pass: configService.get<string>('MAIL_PASSWORD'),
    //       },
    //     },
    //     defaults: {
    //       from: configService.get<string>('MAIL_SENDER'),
    //     },
    //   }),
    // }),

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

    ScheduleModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    AdversitingModule,
    AuthModule,
    CommonModule,
    FilesModule,
    GenderOfUsersModule,
    // MailsModule,
    PetsModule,
    ScheduleTasksModule,
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
