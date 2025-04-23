/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTsEspecificacionDto } from './dto/create-ts_especificacion.dto';
import { UpdateTsEspecificacionDto } from './dto/update-ts_especificacion.dto';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { TsEspecificacion } from './entities/ts_especificacion.entity';

@Injectable()
export class TsEspecificacionService {
  private readonly logger = new Logger(TsEspecificacion.name);

  constructor(
    @InjectRepository(TsEspecificacion)
    private readonly tsEspecificacion: Repository<TsEspecificacion>,
  ) {}

  create(createTsEspecificacionDto: CreateTsEspecificacionDto) {
    return 'This action adds a new tsEspecificacion';
  }

 //Recuperamos todas las tsEspecificacion
 async findAll(): Promise<TsEspecificacion[]> {
    return await this.tsEspecificacion.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsEspecificacion`;
  }

  update(id: number, updateTsEspecificacionDto: UpdateTsEspecificacionDto) {
    return `This action updates a #${id} tsEspecificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsEspecificacion`;
  }

    //Lee archivo de excel
async readExcelAndSave(filePath: string): Promise<void> { //-1
  const resolvedPath = path.resolve(filePath); //-2
  this.logger.log('Leyendo archivo:'+ resolvedPath);
  if (typeof resolvedPath !== 'string' || !fs.existsSync(resolvedPath)) {
    throw new Error('Invalid file path');
  } //-3
  const workbook = XLSX.readFile(filePath); //-4
  const sheetName = workbook.SheetNames[0]; //-5
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);//-6

  //Procesamiento y Guardado de Datos
  for (const row of sheet) { //-Itera sobre cada fila del array sheet.
    this.logger.log('Procesando fila:'+ row['especificacion'] + ' -'+ row['tipo']);
    const tsEspecificacion = new TsEspecificacion(); 
    tsEspecificacion.especificacion = row['especificacion'];
    tsEspecificacion.tipo = row['tipo']; 
    await this.tsEspecificacion.save(tsEspecificacion); 
  }
  // Eliminar el archivo después de procesarlo
  fs.unlinkSync(resolvedPath); //-7
}


//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
this.logger.log('Attempting to delete all data');
try {
  await this.tsEspecificacion.clear();
  this.logger.log('All data deleted successfully');
} catch (error) {
  this.logger.error('Error deleting data', error.stack);
  throw error;
}
}



}
