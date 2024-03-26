import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { CreateBreedOfAnimalDto, UpdateBreedOfAnimalDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { BreedOfAnimalsService } from './breed-of-animals.service';

@Controller('breed-of-animals')
export class BreedOfAnimalsController {

  constructor(
    private readonly breedOfAnimalsService: BreedOfAnimalsService,
  ) { }

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createBreedOfAnimalDto: CreateBreedOfAnimalDto,
  ) {
    return this.breedOfAnimalsService.create(createBreedOfAnimalDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.breedOfAnimalsService.findAll(paginationDto);
  }

  @Get(':id')
   // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.breedOfAnimalsService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.breedOfAnimalsService.remove(id);
  }

  @Delete()
  // @Auth(ValidRoles.superUser)
  removeAll() {
    return this.breedOfAnimalsService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.breedOfAnimalsService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.breedOfAnimalsService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdateBreedOfAnimalDto,
  ) {
    return this.breedOfAnimalsService.update(id, updatePetDto);
  }

}
