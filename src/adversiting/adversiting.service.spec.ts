import { Test, TestingModule } from '@nestjs/testing';
import { AdversitingService } from './adversiting.service';

describe('AdversitingService', () => {
  let service: AdversitingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdversitingService],
    }).compile();

    service = module.get<AdversitingService>(AdversitingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
