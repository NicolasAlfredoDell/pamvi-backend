import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { USERS_SEED } from './data/user.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly usersService: UsersService,
  ) {}
  
  populateDB() {
    this.usersService.fillUsersWithSeedData( USERS_SEED );
    return 'Seeds ejecutadas satisfactoriamente';
  }

}
