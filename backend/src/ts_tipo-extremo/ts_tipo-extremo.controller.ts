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
import { TsTipoExtremoService } from './ts_tipo-extremo.service';
import { CreateTsTipoExtremoDto } from './dto/create-ts_tipo-extremo.dto';
import { UpdateTsTipoExtremoDto } from './dto/update-ts_tipo-extremo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/tipo-extremo')
export class TsTipoExtremoController {
  private readonly logger = new Logger(TsTipoExtremoController.name);
  constructor(private readonly tsTipoExtremoService: TsTipoExtremoService) {}

  @Post()
  create(@Body() createTsTipoExtremoDto: CreateTsTipoExtremoDto) {
    return this.tsTipoExtremoService.create(createTsTipoExtremoDto);
  }

  @Get()
  findAll() {
    return this.tsTipoExtremoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsTipoExtremoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsTipoExtremoDto: UpdateTsTipoExtremoDto) {
    return this.tsTipoExtremoService.update(+id, updateTsTipoExtremoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsTipoExtremoService.remove(+id);
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
      await this.tsTipoExtremoService.readExcelAndSave(file.path);
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
      await this.tsTipoExtremoService.deleteAllData();
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



}//
