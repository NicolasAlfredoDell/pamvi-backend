import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

// DTOs
import { CreateMailDto } from './dto/create-mail.dto';

// Services
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailsService {

  private readonly logger = new Logger('MailsService');

  constructor(
    private readonly mailerService: MailerService,

    private readonly configService: ConfigService,
  ) { }

  async sendMail(
    createMailDto: CreateMailDto,
  ) {
    const { context, subject, template, to } = createMailDto;

    try {
      await this.mailerService.sendMail({
        from: this.configService.get('MAIL_SENDER'),
        subject,
        template,
        to,
        context,
      });
    } catch (error) { this.handleDBException(error) }
  }

  private handleDBException(
    error: any,
  ) {
    if (error.code === `23505`)
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Error inesperado, verifique los logs.`);
  }

}
