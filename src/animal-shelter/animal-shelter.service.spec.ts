import { Test, TestingModule } from '@nestjs/testing';
import { AnimalShelterService } from './animal-shelter.service';

describe('AnimalShelterService', () => {
  let service: AnimalShelterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalShelterService],
    }).compile();

    service = module.get<AnimalShelterService>(AnimalShelterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
