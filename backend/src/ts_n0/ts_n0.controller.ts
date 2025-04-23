/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Logger
} from '@nestjs/common';
import { TsN0Service } from './ts_n0.service';
//import { CreateTsN0Dto } from './dto/create-ts_n0.dto';
//import { UpdateTsN0Dto } from './dto/update-ts_n0.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TsN0 } from './entities/ts_n0.entity';

@Controller('/api/ts-n0')
export class TsN0Controller {
  private readonly logger = new Logger(TsN0.name );
  constructor(private readonly tsN0Service: TsN0Service) {}

  

  @Get()
  findAll() {
    return this.tsN0Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsN0Service.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsN0Service.remove(+id);
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
      await this.tsN0Service.readExcelAndSave(file.path);
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
      await this.tsN0Service.deleteAllData();
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
