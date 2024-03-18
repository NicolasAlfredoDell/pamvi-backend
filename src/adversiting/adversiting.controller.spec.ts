import { Test, TestingModule } from '@nestjs/testing';
import { AdversitingController } from './adversiting.controller';
import { AdversitingService } from './adversiting.service';

describe('AdversitingController', () => {
  let controller: AdversitingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdversitingController],
      providers: [AdversitingService],
    }).compile();

    controller = module.get<AdversitingController>(AdversitingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
