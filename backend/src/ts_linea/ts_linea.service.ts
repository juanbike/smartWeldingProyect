/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
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

import { CreateTsLineaDto } from './dto/create-ts_linea.dto';
import { UpdateTsLineaDto } from './dto/update-ts_linea.dto';

import { TsLinea } from './entities/ts_linea.entity';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';



@Injectable()
export class TsLineaService {

  private readonly logger = new Logger(TsLineaService.name);
  constructor(
    @InjectRepository(TsLinea)
    private readonly tsLineaRepository: Repository<TsLinea>,
  ) {}

 //Creamos un proyecto
 
  create(createTsLineaDto: CreateTsLineaDto) {
    return 'This action adds a new tsLinea';
  }

  //Recuperamos todas las lineas
  async findAll(): Promise<TsLinea[]> {
    return await this.tsLineaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tsLinea`;
  }

  update(id: number, updateTsLineaDto: UpdateTsLineaDto) {
    return `This action updates a #${id} tsLinea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tsLinea`;
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
      const tsLinea = new TsLinea(); 
      tsLinea.linea = row['linea'];
      tsLinea.tipo = row['tipo']; 
      await this.tsLineaRepository.save(tsLinea); 
    }
    // Eliminar el archivo después de procesarlo
    fs.unlinkSync(resolvedPath); //-7
  }

/*
1- async: Indica que esta función es asíncrona y retornará una Promise.
readExcelAndSave(filePath: string): La función recibe un argumento filePath que es una cadena que representa la ruta del archivo Excel.
2- Convierte filePath en una ruta absoluta, asegurándose de que el archivo se pueda localizar correctamente desde cualquier ubicación donde se ejecute el código.
3-typeof resolvedPath !== 'string': Verifica que resolvedPath sea una cadena.
!fs.existsSync(resolvedPath): Verifica si el archivo existe en la ruta especificada. Si alguna de estas condiciones no se cumple, lanza un error indicando que la ruta del archivo es inválida.
4-XLSX.readFile(filePath): Utiliza la biblioteca xlsx para leer el archivo Excel ubicado en filePath. workbook es una representación en memoria del archivo Excel.
5-workbook.SheetNames[0]: Obtiene el nombre de la primera hoja de cálculo en el libro de trabajo.
6- Convierte la hoja de cálculo especificada (workbook.Sheets[sheetName]) en un array de objetos JSON, donde cada objeto representa una fila en la hoja de cálculo.
7- Elimina el archivo en la ruta resolvedPath después de que se ha procesado y guardado en la base de datos. unlinkSync es la versión sincrónica de unlink, lo que significa que se bloqueará hasta que se complete la eliminación del archivo.
*/
g


  //Elimina todos los proyectos
  async deleteAllData(): Promise<void> {
    this.logger.log('Attempting to delete all data');
    try {
      await this.tsLineaRepository.clear();
      this.logger.log('All data deleted successfully');
    } catch (error) {
      this.logger.error('Error deleting data', error.stack);
      throw error;
    }
  }


}//
