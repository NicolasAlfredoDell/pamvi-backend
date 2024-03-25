import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { CreateSpeciesOfAnimalDto, UpdateSpeciesOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { SpeciesOfAnimalsService } from './species-of-animals.service';

@Controller('species-of-animals')
export class SpeciesOfAnimalsController {
  
  constructor(
    private readonly speciesOfAnimalsService: SpeciesOfAnimalsService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createSpeciesOfAnimalDto: CreateSpeciesOfAnimalDto,
  ) {
    return this.speciesOfAnimalsService.create(createSpeciesOfAnimalDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.speciesOfAnimalsService.findAll(paginationDto);
  }

  @Get(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.speciesOfAnimalsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.speciesOfAnimalsService.remove(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  removeAll(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.speciesOfAnimalsService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.speciesOfAnimalsService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.speciesOfAnimalsService.enabled(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSpeciesOfAnimalDto: UpdateSpeciesOfAnimalDto,
  ) {
    return this.speciesOfAnimalsService.update(id, updateSpeciesOfAnimalDto);
  }

}
