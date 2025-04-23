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
import { SoldadoresService } from './soldadores.service';
import { CreateSoldadoreDto } from './dto/create-soldadore.dto';
import { UpdateSoldadoreDto } from './dto/update-soldadore.dto';
import { Soldadore } from './entities/soldadore.entity';

@Controller('api/soldadores')
export class SoldadoresController {
  constructor(private readonly soldadoresService: SoldadoresService) {}

  //Creamos un soldador
  @Post()
  create(@Body() createSoldadoreDto: CreateSoldadoreDto) {
    return this.soldadoresService.create(createSoldadoreDto);
  }

  //Recuperamos todos los soldadores

  @Get()
  findAll() {
    return this.soldadoresService.findAll();
  }

  //Recuperamos un soldador por su id
  @Get(':id')
  findById(@Param('id') id: number): Promise<Soldadore> {
    return this.soldadoresService.findById(id);
  }

  //Actualizamos un soldador por su ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSoldadoreDto: UpdateSoldadoreDto,
  ) {
    return this.soldadoresService.update(+id, updateSoldadoreDto);
  }

  // Eliminar un soldador por su Id

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soldadoresService.remove(+id);
  }

  //Elimina todos los soldadores
  deleteAllSoldadores() {
    this.soldadoresService.deleteAllSoldadores();
  }
}
