import { Test, TestingModule } from '@nestjs/testing';
import { VetClinicService } from './vet-clinic.service';

describe('VetClinicService', () => {
  let service: VetClinicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VetClinicService],
    }).compile();

    service = module.get<VetClinicService>(VetClinicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
