import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { CreatePetDto, UpdatePetDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {

  constructor(
    private readonly petsService: PetsService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createPetDto: CreatePetDto,
  ) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.petsService.findAll(paginationDto);
  }

  @Get(':id')
   // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.petsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.petsService.remove(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.petsService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.petsService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.petsService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.update(id, updatePetDto);
  }

}
