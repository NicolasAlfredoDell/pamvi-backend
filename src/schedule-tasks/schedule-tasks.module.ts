import { Module } from '@nestjs/common';

// Modules
import { TokensValidationModule } from '../tokens-validation/tokens-validation.module';

// Services
import { ScheduleTasksService } from './schedule-tasks.service';

@Module({
  providers: [
    ScheduleTasksService,
  ],
  imports: [
    TokensValidationModule,
  ]
})
export class ScheduleTasksModule {}
