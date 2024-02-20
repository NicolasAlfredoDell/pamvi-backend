import { Test, TestingModule } from '@nestjs/testing';
import { GenderOfUsersService } from './gender-of-users.service';

describe('GenderOfUsersService', () => {
  let service: GenderOfUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderOfUsersService],
    }).compile();

    service = module.get<GenderOfUsersService>(GenderOfUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
