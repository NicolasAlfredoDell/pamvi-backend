import { diskStorage } from 'multer';
import { Response } from 'express';

import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

// Helpers
import { fileFilter, fileNamer } from './helpers';

// Services
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  // @Get(':fileName')
  // findFile(
  //   @Res() res: Response,
  //   @Param('fileName') fileName: string,
  // ) {
  //   const path = this.filesService.getStaticFile(fileName);
  //   res.sendFile(path);
  // } 

  @Post('upload-user-images')
  @UseInterceptors(
    FileInterceptor( 'file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 10000 },
      storage: diskStorage({
        filename: fileNamer,
        destination: './static/uploads/users',
      }),
    })
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if ( !file )
      throw new BadRequestException('Asegurate de seleccionar una imagen');

    const secureUrl = `${this.configService.get('HOST_API')}${file.filename}`;

    return secureUrl;
  }

}
