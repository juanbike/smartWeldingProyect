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

import { TsMaterialService } from './ts_material.service';
import { CreateTsMaterialDto } from './dto/create-ts_material.dto';
import { UpdateTsMaterialDto } from './dto/update-ts_material.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/material')
export class TsMaterialController {

  private readonly logger = new Logger(TsMaterialController.name );
  constructor(private readonly tsMaterialService: TsMaterialService) {}

  @Post()
  create(@Body() createTsMaterialDto: CreateTsMaterialDto) {
    return this.tsMaterialService.create(createTsMaterialDto);
  }

  @Get()
  findAll() {
    return this.tsMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsMaterialDto: UpdateTsMaterialDto) {
    return this.tsMaterialService.update(+id, updateTsMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsMaterialService.remove(+id);
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
      await this.tsMaterialService.readExcelAndSave(file.path);
      return { message: 'La tabla se creó en la base de datos' };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error al procesar el archivo',
      }, HttpStatus.BAD_REQUEST);
    }
  }


  @Delete()
  async deleteAllData() {
    this.logger.log('Received request to delete all data');
    try {
      await this.tsMaterialService.deleteAllData();
      this.logger.log('All data deleted successfully');
      return { message: 'Todos los datos han sido eliminados' };
    } catch (error) {
      this.logger.error('Error deleting all data', error.stack);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'No se pudieron eliminar los datos',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
