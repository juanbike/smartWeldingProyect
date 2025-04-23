/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InspectoresService } from './inspectores.service';
import { CreateInspectoreDto } from './dto/create-inspectore.dto';

import { Inspector } from './entities/inspectore.entity'
import { updateInspectoreDto } from './dto/update-inspectore.dto';

@Controller('api/inspectores/')
export class InspectoresController {
  constructor(private readonly inspectoresService: InspectoresService) {}

  // Creamos un inspector
  @Post()
  create(@Body() createInspectoreDto: CreateInspectoreDto) {
    return this.inspectoresService.create(createInspectoreDto);
  }


  // Recuperamos todos los inspectores
  @Get()
  findAll() {
    return this.inspectoresService.findAll();
  }

  // Recuperamos un inspector por su id
  @Get(':id')
  findById(@Param('id') id: number): Promise<Inspector> {
    return this.inspectoresService.findById(id);
  }

  //Actualizamos un inspector por su ID
  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInspectoreDto: updateInspectoreDto,
  ) {
    return this.inspectoresService.update(+id, updateInspectoreDto);
  }

  // Eliminar un inspector por su Id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectoresService.remove(+id);
  }

  //Elimina todos los inspectores
  @Delete()
  deleteAllInspectores() {
     this.inspectoresService.deleteAllInspectores();
  }


}
