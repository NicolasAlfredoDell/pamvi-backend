import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesOfAnimalsController } from './species-of-animals.controller';
import { SpeciesOfAnimalsService } from './species-of-animals.service';

describe('SpeciesOfAnimalsController', () => {
  let controller: SpeciesOfAnimalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesOfAnimalsController],
      providers: [SpeciesOfAnimalsService],
    }).compile();

    controller = module.get<SpeciesOfAnimalsController>(SpeciesOfAnimalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
