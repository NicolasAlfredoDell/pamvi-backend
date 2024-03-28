import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalShelterService } from './animal-shelter.service';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';

@Controller('animal-shelter')
export class AnimalShelterController {
  constructor(private readonly animalShelterService: AnimalShelterService) {}

  @Post()
  create(@Body() createAnimalShelterDto: CreateAnimalShelterDto) {
    return this.animalShelterService.create(createAnimalShelterDto);
  }

  @Get()
  findAll() {
    return this.animalShelterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalShelterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalShelterDto: UpdateAnimalShelterDto) {
    return this.animalShelterService.update(+id, updateAnimalShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalShelterService.remove(+id);
  }
}
