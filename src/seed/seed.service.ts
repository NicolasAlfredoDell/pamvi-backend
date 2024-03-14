import { Injectable } from '@nestjs/common';

// Data
import { initialData } from './data/seed-data';

// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async populateDB() {
    await this.insertUsers();
    return 'Seeds ejecutadas satisfactoriamente';
  }

  private async insertUsers() {
    this.usersService.removeAllUsers();

    const users = initialData.users;

    const insertPromise = [];

    users.forEach( ( user ) => insertPromise.push( this.usersService.create(user) ) );

    await Promise.all(insertPromise);
  }
}
