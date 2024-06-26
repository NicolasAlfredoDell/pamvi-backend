import { Response } from 'express';

import { Body, Controller, Get, Param, Post, UploadedFile, Res } from '@nestjs/common';

// DTOs
import { DestinationFilesDto } from './dto/destination-files.dto';

// Services
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
  ) { }

  @Get(':folder/:fileName')
  getFile(
    @Param('fileName') fileName: string,
    @Param('folder') folder: string,
    @Res() res: Response,
  ) {
    res.sendFile( this.filesService.getStaticFile(fileName, folder) );
  } 

  @Post('upload-user-images')
  uploadFile(
    @Body() destinationFilesDto: DestinationFilesDto, 
    @UploadedFile() files: Array<Express.Multer.File>,
  ) {
    this.filesService.uploadFiles(destinationFilesDto, files);
  }

}
