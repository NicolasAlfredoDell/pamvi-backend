import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
