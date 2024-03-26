import { Test, TestingModule } from '@nestjs/testing';
import { BreedOfAnimalsService } from './breed-of-animals.service';

describe('BreedOfAnimalsService', () => {
  let service: BreedOfAnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedOfAnimalsService],
    }).compile();

    service = module.get<BreedOfAnimalsService>(BreedOfAnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
