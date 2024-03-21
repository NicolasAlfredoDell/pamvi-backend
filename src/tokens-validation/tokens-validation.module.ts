import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { TokensValidationController } from './tokens-validation.controller';

// Entities
import { TokensValidation } from './entities/tokens-validation.entity';

// Service
import { TokensValidationService } from './tokens-validation.service';

@Module({
  controllers: [
    TokensValidationController,
  ],
  providers: [
    TokensValidationService,
  ],
  imports: [
    TypeOrmModule.forFeature([ TokensValidation ]),
  ],
  exports: [
    TokensValidationService,
    TypeOrmModule.forFeature([ TokensValidation ]),
  ]
})
export class TokensValidationModule {}
