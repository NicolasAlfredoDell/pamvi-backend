import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfUsersService } from './types-of-users.service';

describe('TypesOfUsersService', () => {
  let service: TypesOfUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesOfUsersService],
    }).compile();

    service = module.get<TypesOfUsersService>(TypesOfUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
