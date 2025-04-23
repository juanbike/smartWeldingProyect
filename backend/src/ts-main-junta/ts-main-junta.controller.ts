import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TsMainJuntaService } from './ts-main-junta.service';
import { CreateTsMainJuntaDto } from './dto/create-ts-main-junta.dto';
import { UpdateTsMainJuntaDto } from './dto/update-ts-main-junta.dto';

@Controller('ts-main-junta')
export class TsMainJuntaController {
  constructor(private readonly tsMainJuntaService: TsMainJuntaService) {}

  @Post()
  create(@Body() createTsMainJuntaDto: CreateTsMainJuntaDto) {
    return this.tsMainJuntaService.create(createTsMainJuntaDto);
  }

  @Get()
  findAll() {
    return this.tsMainJuntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsMainJuntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsMainJuntaDto: UpdateTsMainJuntaDto) {
    return this.tsMainJuntaService.update(+id, updateTsMainJuntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsMainJuntaService.remove(+id);
  }
}
