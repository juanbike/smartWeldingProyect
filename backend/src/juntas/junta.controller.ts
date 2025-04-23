/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Junta } from './entities/junta.entity';
import { JuntaService } from './juntas.services';
import { CreateJuntaDto } from './dto/create-junta.dto';

@Controller('api/juntasv2')
export class JuntaController {
  constructor(private readonly juntaService: JuntaService) {}

  @Post()
  async create(@Body() createJuntaDto: CreateJuntaDto): Promise<Junta> {
    return await this.juntaService.createJunta(createJuntaDto);
  }

  //Recupera las juntas por ProyectoID
  @Get('proyecto/:id')
  async getJuntasByProyectoId(@Param('id', ParseIntPipe) id: number): Promise<Junta[]> {
    if (isNaN(id)) {
      throw new BadRequestException('El id debe ser un número');
    }
    return this.juntaService.getJuntasByProyectoId(id);
  }

  //Recupera las juntas por SoldadorID
  @Get('soldador/:id')
  async getJuntasBySoldadorId(@Param('id', ParseIntPipe) id: number): Promise<Junta[]> {
    if (isNaN(id)) {
      throw new BadRequestException('El id debe ser un número');
    }
    return this.juntaService.getJuntasBySoldadorId(id);
  }

  //Recupera las juntas por InspectorID
  @Get('inspector/:id')
  async getJuntasByInspectorId(@Param('id', ParseIntPipe) id: number): Promise<Junta[]> {
    if (isNaN(id)) {
      throw new BadRequestException('El id debe ser un número');
    }
    return this.juntaService.getJuntasByInspectorId(id);
  }

  //// Agrupar por tipoMaterialNombre y totalizar
  @Get('soldadormaterial/:id/material')
  async getMaterialesConsumidosPorSoldador(@Param('id', ParseIntPipe) id: number) {
    return this.juntaService.getMaterialesConsumidosPorSoldador(id);
  }
  




}//fin de la clase
