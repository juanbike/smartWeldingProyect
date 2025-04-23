/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
//import { CreateTsN1Dto } from './dto/create-ts_n1.dto';
//import { UpdateTsN1Dto } from './dto/update-ts_n1.dto';
import { TsN1 } from '../ts_n1/entities/ts_n1.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class TsN1Service {

  private readonly logger = new Logger(TsN1.name);
  constructor(
    @InjectRepository(TsN1)
    private readonly tsN1Repository: Repository<TsN1>,
  ) {}
  
  

  //Encuentra todos los tsN1
  async findAll(): Promise<TsN1[]> {
    return await this.tsN1Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsN1`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} tsN1`;
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
    const tsN1 = new TsN1(); 
    tsN1.n1 = row['n1'];
    await this.tsN1Repository.save(tsN1); 
  }
  // Eliminar el archivo después de procesarlo
  fs.unlinkSync(resolvedPath); //-7
}


//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
this.logger.log('Intentando eliminar todos los datos');
try {
  await this.tsN1Repository.clear();
  this.logger.log('Todos los datos eliminados con éxito');
} catch (error) {
  this.logger.error(' Error eliminado los datos', error.stack);
  throw error;
}
}







}
