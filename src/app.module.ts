import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Config
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

// Externals Modules
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { GenderOfUsersModule } from './gender-of-users/gender-of-users.module';
import { SeedModule } from './seed/seed.module';
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
    AuthModule,
    CommonModule,
    FilesModule,
    GenderOfUsersModule,
    SeedModule,
    TypesOfUsersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
