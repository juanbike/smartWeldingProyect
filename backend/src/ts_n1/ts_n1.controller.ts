/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
 
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Post,
  
} from '@nestjs/common';

//import { CreateTsN1Dto } from './dto/create-ts_n1.dto';
//import { UpdateTsN1Dto } from './dto/update-ts_n1.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TsN1Service } from './ts_n1.service';





@Controller('/api/ts-n1')
export class TsN1Controller {
  
  constructor(private readonly tsN1Service: TsN1Service) {}

  

  @Get()
  findAll() {
    return this.tsN1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsN1Service.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsN1Service.remove(+id);
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
      await this.tsN1Service.readExcelAndSave(file.path);
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
    
    try {
      await this.tsN1Service.deleteAllData();
      
      return { message: 'Todos los datos han sido eliminados' };
    } catch (error) {
      
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'No se pudieron eliminar los datos',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
