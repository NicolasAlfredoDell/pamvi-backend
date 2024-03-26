import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';

// DTOs
import { CreateGenderOfAnimalDto, UpdateGenderOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { GenderOfAnimalsService } from './gender-of-animals.service';

@Controller('gender-of-animals')
export class GenderOfAnimalsController {
  
  constructor(
    private readonly genderOfAnimalsService: GenderOfAnimalsService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createGenderOfAnimalDto: CreateGenderOfAnimalDto,
  ) {
    return this.genderOfAnimalsService.create(createGenderOfAnimalDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.genderOfAnimalsService.findAll(paginationDto);
  }

  @Get(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.genderOfAnimalsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfAnimalsService.remove(id);
  }

  @Delete()
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.genderOfAnimalsService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfAnimalsService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfAnimalsService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGenderOfAnimalDto: UpdateGenderOfAnimalDto,
  ) {
    return this.genderOfAnimalsService.update(id, updateGenderOfAnimalDto);
  }

}
