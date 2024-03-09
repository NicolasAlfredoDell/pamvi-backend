import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

// DTOs
import { CreateGenderOfUserDto } from './dto/create-gender-of-user.dto';
import { UpdateGenderOfUserDto } from './dto/update-gender-of-user.dto';

// Services
import { GenderOfUsersService } from './gender-of-users.service';

@Controller('gender-of-users')
export class GenderOfUsersController {

  constructor(
    private readonly genderOfUsersService: GenderOfUsersService,
  ) {}

  @Post()
  create(
    @Body() createGenderOfUserDto: CreateGenderOfUserDto,
  ) {
    return this.genderOfUsersService.create(createGenderOfUserDto);
  }

  @Get()
  findAll() {
    return this.genderOfUsersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.genderOfUsersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenderOfUserDto: UpdateGenderOfUserDto,
  ) {
    return this.genderOfUsersService.update(+id, updateGenderOfUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.genderOfUsersService.remove(+id);
  }

}
