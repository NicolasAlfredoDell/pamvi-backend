import { Test, TestingModule } from '@nestjs/testing';
import { TokensValidationController } from './tokens-validation.controller';
import { TokensValidationService } from './tokens-validation.service';

describe('TokensValidationController', () => {
  let controller: TokensValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensValidationController],
      providers: [TokensValidationService],
    }).compile();

    controller = module.get<TokensValidationController>(TokensValidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
