import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VetClinicService } from './vet-clinic.service';
import { CreateVetClinicDto } from './dto/create-vet-clinic.dto';
import { UpdateVetClinicDto } from './dto/update-vet-clinic.dto';

@Controller('vet-clinic')
export class VetClinicController {
  constructor(private readonly vetClinicService: VetClinicService) {}

  @Post()
  create(@Body() createVetClinicDto: CreateVetClinicDto) {
    return this.vetClinicService.create(createVetClinicDto);
  }

  @Get()
  findAll() {
    return this.vetClinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vetClinicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetClinicDto: UpdateVetClinicDto) {
    return this.vetClinicService.update(+id, updateVetClinicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vetClinicService.remove(+id);
  }
}
