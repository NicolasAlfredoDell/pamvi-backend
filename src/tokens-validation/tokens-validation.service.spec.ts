import { Test, TestingModule } from '@nestjs/testing';
import { TokensValidationService } from './tokens-validation.service';

describe('TokensValidationService', () => {
  let service: TokensValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensValidationService],
    }).compile();

    service = module.get<TokensValidationService>(TokensValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
