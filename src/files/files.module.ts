import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { FilesController } from './files.controller';

// Services
import { FilesService } from './files.service';

@Module({
  controllers: [
    FilesController,
  ],
  providers: [
    FilesService,
  ],
  imports: [
    ConfigModule,
  ],
})
export class FilesModule {}
