import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { ReportsController } from './reports.controller';

// Entities
import { Report } from './entities/report.entity';

// Modules
import { UsersModule } from 'src/users/users.module';

// Services
import { ReportsService } from './reports.service';

@Module({
  controllers: [
    ReportsController,
  ],
  providers: [
    ReportsService,
  ],
  imports: [
    TypeOrmModule.forFeature([ Report ]),
    UsersModule,
  ]
})
export class ReportsModule {}
