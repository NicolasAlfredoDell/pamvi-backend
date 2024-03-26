import { Test, TestingModule } from '@nestjs/testing';
import { GenderOfAnimalsService } from './gender-of-animals.service';

describe('GenderOfAnimalsService', () => {
  let service: GenderOfAnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderOfAnimalsService],
    }).compile();

    service = module.get<GenderOfAnimalsService>(GenderOfAnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
