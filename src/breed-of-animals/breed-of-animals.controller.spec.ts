import { Test, TestingModule } from '@nestjs/testing';
import { BreedOfAnimalsController } from './breed-of-animals.controller';
import { BreedOfAnimalsService } from './breed-of-animals.service';

describe('BreedOfAnimalsController', () => {
  let controller: BreedOfAnimalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedOfAnimalsController],
      providers: [BreedOfAnimalsService],
    }).compile();

    controller = module.get<BreedOfAnimalsController>(BreedOfAnimalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
