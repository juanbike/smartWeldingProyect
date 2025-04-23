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
import { TsScheduleService } from './ts_schedule.service';
import { CreateTsScheduleDto } from './dto/create-ts_schedule.dto';
import { UpdateTsScheduleDto } from './dto/update-ts_schedule.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/tsSchedule')
export class TsScheduleController {
  private readonly logger = new Logger(TsScheduleController.name);
  constructor(private readonly tsScheduleService: TsScheduleService) {}

  @Post()
  create(@Body() createTsScheduleDto: CreateTsScheduleDto) {
    return this.tsScheduleService.create(createTsScheduleDto);
  }

  @Get()
  findAll() {
    return this.tsScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsScheduleDto: UpdateTsScheduleDto) {
    return this.tsScheduleService.update(+id, updateTsScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsScheduleService.remove(+id);
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
      await this.tsScheduleService.readExcelAndSave(file.path);
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
      await this.tsScheduleService.deleteAllData();
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
