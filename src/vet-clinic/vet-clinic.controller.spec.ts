import { Test, TestingModule } from '@nestjs/testing';
import { VetClinicController } from './vet-clinic.controller';
import { VetClinicService } from './vet-clinic.service';

describe('VetClinicController', () => {
  let controller: VetClinicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VetClinicController],
      providers: [VetClinicService],
    }).compile();

    controller = module.get<VetClinicController>(VetClinicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
