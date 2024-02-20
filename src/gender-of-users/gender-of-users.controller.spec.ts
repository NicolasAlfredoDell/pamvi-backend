import { Test, TestingModule } from '@nestjs/testing';
import { GenderOfUsersController } from './gender-of-users.controller';
import { GenderOfUsersService } from './gender-of-users.service';

describe('GenderOfUsersController', () => {
  let controller: GenderOfUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderOfUsersController],
      providers: [GenderOfUsersService],
    }).compile();

    controller = module.get<GenderOfUsersController>(GenderOfUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
