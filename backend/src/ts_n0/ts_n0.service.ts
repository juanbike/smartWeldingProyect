/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
//import { CreateTsN0Dto } from './dto/create-ts_n0.dto';
//import { UpdateTsN0Dto } from './dto/update-ts_n0.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TsN0 } from '../ts_n0/entities/ts_n0.entity';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class TsN0Service {
  private readonly logger = new Logger(TsN0.name);
  constructor(
    @InjectRepository(TsN0)
    private readonly tsN0Repository: Repository<TsN0>,
  ) {}

  

 //Recupera todos los tsN0
 async findAll(): Promise<TsN0[]> {
    return await this.tsN0Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsN0`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} tsN0`;
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
    this.logger.log('Procesando fila:'+ row['n0']);
    const tsN0 = new TsN0(); 
    tsN0.n0 = row['n0'];
    await this.tsN0Repository.save(tsN0); 
  }
  // Eliminar el archivo después de procesarlo
  fs.unlinkSync(resolvedPath); //-7
}


//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
this.logger.log('Intentando eliminar todos los datos');
try {
  await this.tsN0Repository.clear();
  this.logger.log('Todos los datos eliminados con éxito');
} catch (error) {
  this.logger.error(' Error eliminado los datos', error.stack);
  throw error;
}
}


}
