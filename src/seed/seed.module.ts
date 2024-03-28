import { Module } from '@nestjs/common';

// Controllers
import { SeedController } from './seed.controller';

// Modules
import { AuthModule } from 'src/auth/auth.module';
import { BreedOfAnimalsModule } from 'src/breed-of-animals/breed-of-animals.module';
import { ColorsModule } from 'src/colors/colors.module';
import { GenderOfAnimalsModule } from 'src/gender-of-animals/gender-of-animals.module';
import { GenderOfUsersModule } from 'src/gender-of-users/gender-of-users.module';
import { PetsModule } from 'src/pets/pets.module';
import { ReportsModule } from 'src/reports/reports.module';
import { SpeciesOfAnimalsModule } from 'src/species-of-animals/species-of-animals.module';
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
    BreedOfAnimalsModule,
    ColorsModule,
    GenderOfAnimalsModule,
    GenderOfUsersModule,
    PetsModule,
    ReportsModule,
    SpeciesOfAnimalsModule,
    TypesOfUsersModule,
    UsersModule,
  ],
})
export class SeedModule {}
