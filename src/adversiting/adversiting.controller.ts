import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdversitingService } from './adversiting.service';
import { CreateAdversitingDto } from './dto/create-adversiting.dto';
import { UpdateAdversitingDto } from './dto/update-adversiting.dto';

@Controller('adversiting')
export class AdversitingController {
  constructor(private readonly adversitingService: AdversitingService) {}

  @Post()
  create(@Body() createAdversitingDto: CreateAdversitingDto) {
    return this.adversitingService.create(createAdversitingDto);
  }

  @Get()
  findAll() {
    return this.adversitingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adversitingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdversitingDto: UpdateAdversitingDto) {
    return this.adversitingService.update(+id, updateAdversitingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adversitingService.remove(+id);
  }
}
