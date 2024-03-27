import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { CreateReportDto, UpdateReportDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.reportsService.findAll(paginationDto);
  }

  @Get(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.reportsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportsService.remove(id);
  }

  @Delete()
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.reportsService.removeAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(id, updateReportDto);
  }

}
