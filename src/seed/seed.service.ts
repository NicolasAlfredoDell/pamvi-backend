import { Injectable } from '@nestjs/common';

// Data
import { initialData } from './data/seed-data';

// Services
import { BreedOfAnimalsService } from 'src/breed-of-animals/breed-of-animals.service';
import { ColorsService } from '../colors/colors.service';
import { GenderOfAnimalsService } from 'src/gender-of-animals/gender-of-animals.service';
import { GenderOfUsersService } from '../gender-of-users/gender-of-users.service';
import { PetsService } from '../pets/pets.service';
import { ReportsService } from '../reports/reports.service';
import { SpeciesOfAnimalsService } from '../species-of-animals/species-of-animals.service';
import { TypesOfUsersService } from 'src/types-of-users/types-of-users.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly breedOfAnimalsService: BreedOfAnimalsService,
    private readonly colorsService: ColorsService,
    private readonly genderOfAnimalsService: GenderOfAnimalsService,
    private readonly genderOfUsersService: GenderOfUsersService,
    private readonly petsService: PetsService,
    private readonly reportsService: ReportsService,
    private readonly speciesOfAnimalsService: SpeciesOfAnimalsService,
    private readonly typesOfUsersService: TypesOfUsersService,
    private readonly usersService: UsersService,
  ) {}

  async populateDB() {
    await this.deleteTables();
    await this.insertTables();

    return {
      message: 'Seeds ejecutadas satisfactoriamente',
    };
  }

  private async deleteTables(): Promise<void> {
    await this.usersService.removeAll();
    await this.petsService.removeAll();

    await this.breedOfAnimalsService.removeAll();
    await this.colorsService.removeAll();
    await this.genderOfAnimalsService.removeAll();
    await this.genderOfUsersService.removeAll();
    await this.reportsService.removeAll();
    await this.speciesOfAnimalsService.removeAll();
    await this.typesOfUsersService.removeAll();
  }

  private async insertTables(): Promise<void> {
    await this.insertTable('breedOfAnimals');
    await this.insertTable('typesOfUsers');
    // await this.insertTable('speciesOfAnimals');
    // await this.insertTable('reports');
    // await this.insertTable('genderOfUsers');
    // await this.insertTable('genderOfAnimals');
    // await this.insertTable('colors');

    // await this.insertTable('users');
    // await this.insertTable('pets');
  }

  private async insertTable(
    table: string,
  ) {
    const data = initialData[table];
    const insertPromise = [];

    switch (table) {
      case 'typesOfUsers':
        data.forEach( ( d ) => insertPromise.push( this.typesOfUsersService.create(d) ) );
        break;
    
      case 'speciesOfAnimals':
        data.forEach( ( d ) => insertPromise.push( this.speciesOfAnimalsService.create(d) ) );
        break;

      case 'reports':
        data.forEach( ( d ) => insertPromise.push( this.reportsService.create(d) ) );
        break;

      case 'genderOfUsers':
        data.forEach( ( d ) => insertPromise.push( this.genderOfUsersService.create(d) ) );
        break;

      case 'genderOfAnimals':
        data.forEach( ( d ) => insertPromise.push( this.genderOfAnimalsService.create(d) ) );
        break;

      case 'colors':
        data.forEach( ( d ) => insertPromise.push( this.colorsService.create(d) ) );
        break;

      case 'breedOfAnimals':
        data.forEach( ( d ) => insertPromise.push( this.breedOfAnimalsService.create(d) ) );
        break;

      case 'users':
        data.forEach( ( d ) => insertPromise.push( this.usersService.create(d) ) );
        break;

      case 'pets':
        data.forEach( ( d ) => insertPromise.push( this.petsService.create(d) ) );
        break;
    }

    await Promise.all(insertPromise);
  }
}
