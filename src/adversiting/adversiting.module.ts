import { Module } from '@nestjs/common';
import { AdversitingService } from './adversiting.service';
import { AdversitingController } from './adversiting.controller';

@Module({
  controllers: [AdversitingController],
  providers: [AdversitingService],
})
export class AdversitingModule {}
