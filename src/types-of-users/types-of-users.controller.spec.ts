import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfUsersController } from './types-of-users.controller';
import { TypesOfUsersService } from './types-of-users.service';

describe('TypesOfUsersController', () => {
  let controller: TypesOfUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesOfUsersController],
      providers: [TypesOfUsersService],
    }).compile();

    controller = module.get<TypesOfUsersController>(TypesOfUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
