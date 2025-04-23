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
import { CreateTsScheduleDto } from './dto/create-ts_schedule.dto';
import { UpdateTsScheduleDto } from './dto/update-ts_schedule.dto';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { TsSchedule } from './entities/ts_schedule.entity';


@Injectable()
export class TsScheduleService {
  private readonly logger = new Logger(TsSchedule.name);

  constructor(
    @InjectRepository(TsSchedule)
    private readonly tsScheduleRepository: Repository<TsSchedule>,
  ) {}

  create(createTsScheduleDto: CreateTsScheduleDto) {
    return 'This action adds a new tsSchedule';
  }

  //Encuentra todos los schedule
  async findAll(): Promise<TsSchedule[]> {
    return await this.tsScheduleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsSchedule`;
  }

  update(id: number, updateTsScheduleDto: UpdateTsScheduleDto) {
    return `This action updates a #${id} tsSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsSchedule`;
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
      const tsSchedule = new TsSchedule(); 
      tsSchedule.schedule = row['schedule'];
      tsSchedule.tipo = row['tipo']; 
      await this.tsScheduleRepository.save(tsSchedule); 
    }
    // Eliminar el archivo después de procesarlo
    fs.unlinkSync(resolvedPath); //-7
  }

  
//Elimina todos los proyectos
async deleteAllData(): Promise<void> {
  this.logger.log('Attempting to delete all data');
  try {
    await this.tsScheduleRepository.clear();
    this.logger.log('All data deleted successfully');
  } catch (error) {
    this.logger.error('Error deleting data', error.stack);
    throw error;
  }
}



}
