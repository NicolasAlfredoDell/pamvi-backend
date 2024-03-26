import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';

// DTOs
import { CreateColorDto, UpdateColorDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { ColorsService } from './colors.service';


@Controller('colors')
export class ColorsController {

  constructor(
    private readonly colorsService: ColorsService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createColorDto: CreateColorDto,
  ) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.colorsService.findAll(paginationDto);
  }

  @Get(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.colorsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.colorsService.remove(id);
  }

  @Delete()
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.colorsService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.colorsService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.colorsService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.colorsService.update(id, updateColorDto);
  }

}
