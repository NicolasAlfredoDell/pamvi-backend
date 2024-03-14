import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';

// DTOs
import { CreateGenderOfUserDto, UpdateGenderOfUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

// Services
import { GenderOfUsersService } from './gender-of-users.service';

@Controller('gender-of-users')
export class GenderOfUsersController {

  constructor(
    private readonly genderOfUsersService: GenderOfUsersService,
  ) {}

  @Post()
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  create(
    @Body() createGenderOfUserDto: CreateGenderOfUserDto,
  ) {
    return this.genderOfUsersService.create(createGenderOfUserDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.genderOfUsersService.findAll(paginationDto);
  }

  @Get(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  findOne(
    @Param('id') id: string,
  ) {
    return this.genderOfUsersService.findOne(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfUsersService.remove(id);
  }

  @Delete(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  removeAll(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfUsersService.removeAll();
  }

  @Patch('disabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  disabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfUsersService.disabled(id);
  }

  @Patch('enabled/:id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  enabled(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genderOfUsersService.enabled(id);
  }

  @Patch(':id')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGenderOfUserDto: UpdateGenderOfUserDto,
  ) {
    return this.genderOfUsersService.update(id, updateGenderOfUserDto);
  }

}
