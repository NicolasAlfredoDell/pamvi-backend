import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseUUIDPipe } from '@nestjs/common';

// DTOs
import { CreateTypesOfUserDto, UpdateTypesOfUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { TypesOfUsersService } from './types-of-users.service';

@Controller('types-of-users')
export class TypesOfUsersController {

  constructor(
    private readonly typesOfUsersService: TypesOfUsersService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createTypesOfUserDto: CreateTypesOfUserDto,
  ) {
    return this.typesOfUsersService.create(createTypesOfUserDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.typesOfUsersService.findAll(paginationDto);
  }

  @Get(':id')
   // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.typesOfUsersService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.typesOfUsersService.remove(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser)
  removeAll(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.typesOfUsersService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.typesOfUsersService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.typesOfUsersService.enabled(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTypesOfUserDto: UpdateTypesOfUserDto,
  ) {
    return this.typesOfUsersService.update(id, updateTypesOfUserDto);
  }

}
