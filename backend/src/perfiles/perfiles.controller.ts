import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { CreatePerfileDto } from './dto/create-perfile.dto';
import { UpdatePerfileDto } from './dto/update-perfile.dto';

@Controller('api/perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  // Creamos un perfil
  @Post()
  create(@Body() createPerfileDto: CreatePerfileDto) {
    return this.perfilesService.create(createPerfileDto);
  }

  // Recuperamos todos los perfiles
  @Get()
  findAll() {
    return this.perfilesService.findAll();
  }

  // Recuperamos un inspector por su id

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilesService.findById(+id);
  }

  //Actualizamos un perfil por su ID

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfileDto: UpdatePerfileDto) {
    return this.perfilesService.update(+id, updatePerfileDto);
  }

  //Elimina un perfil por su id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilesService.remove(+id);
  }
}
