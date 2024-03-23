import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// Services
import { TokensValidationService } from '../tokens-validation/tokens-validation.service';

@Injectable()
export class ScheduleTasksService {

  private readonly logger = new Logger('ScheduleTasksService');

  constructor(
    private readonly tokensValidationService: TokensValidationService,
  ) {}

  @Cron('0 12 * * *')
  async removeAllTokensValidationExpiredCron() {
    try {
      const message = await this.tokensValidationService.removeAllExpired();

      this.logger.log(message);
    } catch (error) { this.handleDBException(error) }
  }
  
  private handleDBException(
    error: any,
  ): never {
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
