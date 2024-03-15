import { Injectable } from '@nestjs/common';

// Data
import { initialData } from './data/seed-data';

// Services
import { GenderOfUsersService } from '../gender-of-users/gender-of-users.service';
import { UsersService } from '../users/users.service';
import { TypesOfUsersService } from 'src/types-of-users/types-of-users.service';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly genderOfUsersService: GenderOfUsersService,
    private readonly typesOfUsersService: TypesOfUsersService,
    private readonly usersService: UsersService,
  ) {}

  async populateDB() {
    await this.deleteTables();

    await this.insertUsers();

    return {
      message: 'Seeds ejecutadas satisfactoriamente',
    };
  }

  private async deleteTables(): Promise<void> {
    await this.usersService.removeAll();
    await this.genderOfUsersService.removeAll();
    await this.typesOfUsersService.removeAll();
  }

  private async insertUsers() {
    const users = initialData.users;

    const insertPromise = [];

    users.forEach( ( user ) => insertPromise.push( this.usersService.create(user) ) );

    await Promise.all(insertPromise);
  }
}
