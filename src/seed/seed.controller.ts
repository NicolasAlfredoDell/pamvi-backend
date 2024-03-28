import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

// Decorators
import { Auth } from 'src/users/decorators/user.decorator';

// Interfaces
import { ValidRoles } from 'src/users/interfaces/valid-roles.interface';

// Services
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {

  constructor(
    private readonly seedService: SeedService,
  ) { }

  @Get()
  // @Auth( ValidRoles.superUser, )
  run() {
    return this.seedService.populateDB();
  }

}
