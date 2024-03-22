import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

// DTOs
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailsService {

  private readonly logger = new Logger('MailsService');

  constructor(
    private readonly mailerService: MailerService,
  ) { }

  async sendMail(
    createMailDto: CreateMailDto,
  ) {
    const { from, html, subject, text, to } = createMailDto;

    try {
      await this.mailerService.sendMail({
        from,
        html,
        subject,
        text,
        to
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
