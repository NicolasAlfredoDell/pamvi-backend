import { Test, TestingModule } from '@nestjs/testing';
import { GenderOfAnimalsController } from './gender-of-animals.controller';
import { GenderOfAnimalsService } from './gender-of-animals.service';

describe('GenderOfAnimalsController', () => {
  let controller: GenderOfAnimalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderOfAnimalsController],
      providers: [GenderOfAnimalsService],
    }).compile();

    controller = module.get<GenderOfAnimalsController>(GenderOfAnimalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
