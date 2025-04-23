/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { TsTipoMaterialService } from './ts_tipo-material.service';
import { CreateTsTipoMaterialDto } from './dto/create-ts_tipo-material.dto';
import { UpdateTsTipoMaterialDto } from './dto/update-ts_tipo-material.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/tipo-material')
export class TsTipoMaterialController {
  private readonly logger = new Logger(TsTipoMaterialController.name);
  constructor(private readonly tsTipoMaterialService: TsTipoMaterialService) {}

  @Post()
  create(@Body() createTsTipoMaterialDto: CreateTsTipoMaterialDto) {
    return this.tsTipoMaterialService.create(createTsTipoMaterialDto);
  }

  @Get()
  findAll() {
    return this.tsTipoMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsTipoMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsTipoMaterialDto: UpdateTsTipoMaterialDto) {
    return this.tsTipoMaterialService.update(+id, updateTsTipoMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsTipoMaterialService.remove(+id);
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
      await this.tsTipoMaterialService.readExcelAndSave(file.path);
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
      await this.tsTipoMaterialService.deleteAllData();
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
