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
import { CreateTsMaterialDto } from './dto/create-ts_material.dto';
import { UpdateTsMaterialDto } from './dto/update-ts_material.dto';

import { TsMaterial } from '../ts_material/entities/ts_material.entity';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class TsMaterialService {
  private readonly logger = new Logger(TsMaterial.name);
  constructor(
    @InjectRepository(TsMaterial)
    private readonly tsLineaRepository: Repository<TsMaterial>,
  ) {}
  create(createTsMaterialDto: CreateTsMaterialDto) {
    return 'This action adds a new tsMaterial';
  }

  //Recupeta todas los tsMaterial
  async findAll(): Promise<TsMaterial[]> {
    return await this.tsLineaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsMaterial`;
  }

  update(id: number, updateTsMaterialDto: UpdateTsMaterialDto) {
    return `This action updates a #${id} tsMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsMaterial`;
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
        const tsMaterial = new TsMaterial(); 
        tsMaterial.material = row['material'];
        tsMaterial.tipo = row['tipo']; 
        await this.tsLineaRepository.save(tsMaterial); 
      }
      // Eliminar el archivo después de procesarlo
      fs.unlinkSync(resolvedPath); //-7
    }
  
    
  //Elimina todos los proyectos
  async deleteAllData(): Promise<void> {
    this.logger.log('Intentando eliminar todos los datos');
    try {
      await this.tsLineaRepository.clear();
      this.logger.log('Todos los datos eliminados con éxito');
    } catch (error) {
      this.logger.error('Error eliminado los datos', error.stack);
      throw error;
    }
  }




}//
