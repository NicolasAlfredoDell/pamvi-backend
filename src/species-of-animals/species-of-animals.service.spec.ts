import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesOfAnimalsService } from './species-of-animals.service';

describe('SpeciesOfAnimalsService', () => {
  let service: SpeciesOfAnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeciesOfAnimalsService],
    }).compile();

    service = module.get<SpeciesOfAnimalsService>(SpeciesOfAnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
