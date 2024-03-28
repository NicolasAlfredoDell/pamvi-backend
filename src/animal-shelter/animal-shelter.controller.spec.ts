import { Test, TestingModule } from '@nestjs/testing';
import { AnimalShelterController } from './animal-shelter.controller';
import { AnimalShelterService } from './animal-shelter.service';

describe('AnimalShelterController', () => {
  let controller: AnimalShelterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalShelterController],
      providers: [AnimalShelterService],
    }).compile();

    controller = module.get<AnimalShelterController>(AnimalShelterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
