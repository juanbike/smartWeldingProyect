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
import { CreateTsTipoMaterialDto } from './dto/create-ts_tipo-material.dto';
import { UpdateTsTipoMaterialDto } from './dto/update-ts_tipo-material.dto';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { TsTipoMaterial } from './entities/ts_tipo-material.entity';

@Injectable()
export class TsTipoMaterialService {
  private readonly logger = new Logger(TsTipoMaterial.name);
  
  constructor(
    @InjectRepository(TsTipoMaterial)
    private readonly tsTipoMaterialRepository: Repository<TsTipoMaterial>,
  ) {}

  create(createTsTipoMaterialDto: CreateTsTipoMaterialDto) {
    return 'This action adds a new tsTipoMaterial';
  }

  //Encutra todos los tipo Material
  async findAll(): Promise<TsTipoMaterial[]> {
    return await this.tsTipoMaterialRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsTipoMaterial`;
  }

  update(id: number, updateTsTipoMaterialDto: UpdateTsTipoMaterialDto) {
    return `This action updates a #${id} tsTipoMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsTipoMaterial`;
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
    const tsTipoMaterial = new TsTipoMaterial(); 
    tsTipoMaterial.tipoMaterial = row['tipoMaterial'];
    tsTipoMaterial.tipo = row['tipo']; 
    await this.tsTipoMaterialRepository.save(tsTipoMaterial); 
  }
  // Eliminar el archivo después de procesarlo
  fs.unlinkSync(resolvedPath); //-7
}


//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
this.logger.log('Attempting to delete all data');
try {
  await this.tsTipoMaterialRepository.clear();
  this.logger.log('All data deleted successfully');
} catch (error) {
  this.logger.error('Error deleting data', error.stack);
  throw error;
}
}






}
