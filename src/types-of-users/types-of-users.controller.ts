import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesOfUsersService } from './types-of-users.service';
import { CreateTypesOfUserDto } from './dto/create-types-of-user.dto';
import { UpdateTypesOfUserDto } from './dto/update-types-of-user.dto';

@Controller('types-of-users')
export class TypesOfUsersController {
  constructor(private readonly typesOfUsersService: TypesOfUsersService) {}

  @Post()
  create(@Body() createTypesOfUserDto: CreateTypesOfUserDto) {
    return this.typesOfUsersService.create(createTypesOfUserDto);
  }

  @Get()
  findAll() {
    return this.typesOfUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesOfUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypesOfUserDto: UpdateTypesOfUserDto) {
    return this.typesOfUsersService.update(+id, updateTypesOfUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesOfUsersService.remove(+id);
  }
}
