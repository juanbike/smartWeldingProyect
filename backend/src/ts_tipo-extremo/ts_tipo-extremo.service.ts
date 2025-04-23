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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateTsTipoExtremoDto } from './dto/create-ts_tipo-extremo.dto';
import { UpdateTsTipoExtremoDto } from './dto/update-ts_tipo-extremo.dto';
import { TsTipoExtremo } from '../ts_tipo-extremo/entities/ts_tipoExtremo.entity';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TsTipoExtremoService {

  private readonly logger = new Logger(TsTipoExtremo.name);

  constructor(
    @InjectRepository(TsTipoExtremo)
    private readonly tsTipoExtremoRepository: Repository<TsTipoExtremo>,
  ) {}

  create(createTsTipoExtremoDto: CreateTsTipoExtremoDto) {
    return 'This action adds a new tsTipoExtremo';
  }

 //Encuentra todos los tipoExtremo
 async findAll(): Promise<TsTipoExtremo[]> {
    return await this.tsTipoExtremoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsTipoExtremo`;
  }

  update(id: number, updateTsTipoExtremoDto: UpdateTsTipoExtremoDto) {
    return `This action updates a #${id} tsTipoExtremo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsTipoExtremo`;
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
    this.logger.log('Procesando fila:'+ row['linea'] + ' -'+ row['tipo']);
    const tsTipoExtremo = new TsTipoExtremo(); 
    tsTipoExtremo.tipoExtremo = row['tipoExtremo'];
    tsTipoExtremo.tipo = row['tipo']; 
    await this.tsTipoExtremoRepository.save(tsTipoExtremo); 
  }
  // Eliminar el archivo después de procesarlo
  fs.unlinkSync(resolvedPath); //-7
}


//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
this.logger.log('Attempting to delete all data');
try {
  await this.tsTipoExtremoRepository.clear();
  this.logger.log('All data deleted successfully');
} catch (error) {
  this.logger.error('Error deleting data', error.stack);
  throw error;
}
}






}//
