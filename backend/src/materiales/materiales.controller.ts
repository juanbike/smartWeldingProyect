/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Logger
} from '@nestjs/common';
import { Materiales } from './entities/materiale.entity';

import { MaterialesService } from './materiales.service';
import { CreateMaterialeDto } from './dto/create-materiale.dto';
import { UpdateMaterialeDto } from './dto/update-materiale.dto'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/materiales')
export class MaterialesController {
  private readonly logger = new Logger(MaterialesController.name );
  constructor(private readonly materialesService: MaterialesService) {}

  //Creamos un material
  @Post()
  create(@Body() createMaterialeDto: CreateMaterialeDto) {
    return this.materialesService.create(createMaterialeDto);
  }

  //Recuperamos todos los materiales

  @Get()
  findAll() {
    return this.materialesService.findAll();
  }

  //Recuperamos un material por ID

  @Get(':id')
  findById(@Param('id') id: number): Promise<Materiales> {
    return this.materialesService.findById(id);
  }

    //Actualizamos un material por su ID

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialeDto: UpdateMaterialeDto) {
    return this.materialesService.update(+id, updateMaterialeDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('File', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async uploadData(@UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
    try {
      if (!file) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Archivo no proporcionado',
        }, HttpStatus.BAD_REQUEST);
      }
      await this.materialesService.readExcelAndSave(file.path);
      return { message: 'La tabla se creó en la base de datos' };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error al procesar el archivo',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialesService.remove(+id);
  }

  //eliminha todos los materiales
  deleteAllMateriales(){
    this.materialesService.deleteAllMateriales()
  }
}
