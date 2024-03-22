import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

// DTOs
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailsService {

  constructor(
    private readonly mailerService: MailerService,
  ) { }

  sendMail(
    createMailDto: CreateMailDto,
  ) {
    
  }

}
