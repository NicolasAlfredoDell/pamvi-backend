import { Module } from '@nestjs/common';

// Controllers
import { MailsController } from './mails.controller';

// Modules
import { ConfigModule } from '@nestjs/config';

// Services
import { MailsService } from './mails.service';

@Module({
  controllers: [
    MailsController,
  ],
  providers: [
    MailsService,
  ],
  imports: [
    ConfigModule,
  ],
  exports: [
    MailsService,
  ]
})
export class MailsModule {}
