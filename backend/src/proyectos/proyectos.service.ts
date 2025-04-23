/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

import { Proyecto } from './entities/proyecto.entity';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProyectosService {
  private readonly logger = new Logger(ProyectosService.name);
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}

  //Creamos un proyecto
  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    // Validar el objeto CreateProductDto
    const errors = await validate(createProyectoDto);

    // Si hay errores de validación, devolverlos en una respuesta HTTP 400 Bad Request
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Error de validación', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const nuevoProyecto = new Proyecto();
    nuevoProyecto.proyecto = createProyectoDto.proyecto;
    nuevoProyecto.cliente = createProyectoDto.cliente;
    nuevoProyecto.titulo = createProyectoDto.titulo;
    nuevoProyecto.revision = createProyectoDto.revision;
    nuevoProyecto.tipo = createProyectoDto.tipo;
    nuevoProyecto.elaboradoPor = createProyectoDto.elaboradoPor;
    return await this.proyectosRepository.save(nuevoProyecto);
  }

  

  //Recuperamos todos los proyectos

  async findAll(): Promise<Proyecto[]> {
    return await this.proyectosRepository.find();
  }

  //Recuperamos todos los proyectos con sus juntas e inspectores
  /*
  async getProyectosConJuntas() {
    return this.proyectosRepository.find({
      relations: ['juntas', 'juntas.inspectores'],
      select: ['id', 'proyecto', 'cliente', 'titulo','revision', 'tipo', 'elaboradoPor' ],
      
      order: {
        id: 'ASC',
      }
    });
  }

*/



  //Recuperamos un proyecto por su Id

  async findById(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOneBy({ id: id });

    if (!proyecto) {
      throw new NotFoundException(
        `El inspector con el ID ${id} no se encuentra`,
      );
    }

    return proyecto;
  }

  //Actualizamos un proyecto

  async update(
    id: number,
    UpdateProyectoDto: Partial<Proyecto>,
  ): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOneBy({ id: id });

    if (!proyecto) {
      throw new NotFoundException(
        `El inspector con el ID ${id} no se encuentra`,
      );
    }

    // Actualiza los campos del usuario con los datos proporcionados
    this.proyectosRepository.merge(proyecto, UpdateProyectoDto);

    return this.proyectosRepository.save(proyecto);
  }

  // Eliminar un proyecto por su Id
  async remove(id: number): Promise<void> {
    const proyecto = await this.proyectosRepository.findOneBy({ id: id });

    if (!proyecto) {
      throw new NotFoundException(
        `El inspector con el ID ${id} no se encuentra`,
      );
    }

    await this.proyectosRepository.remove(proyecto);
  }


  //lee archivo de excel

  async readExcelAndSave(filePath: string): Promise<void> { //-1
    const resolvedPath = path.resolve(filePath); //-2

    if (typeof resolvedPath !== 'string' || !fs.existsSync(resolvedPath)) {
      throw new Error('Invalid file path');
    } //-3
    const workbook = XLSX.readFile(filePath); //-4
    const sheetName = workbook.SheetNames[0]; //-5
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);//-6

    //Procesamiento y Guardado de Datos
    for (const row of sheet) { //-Itera sobre cada fila del array sheet.
      const proyecto = new Proyecto(); //-Crea una nueva instancia de la entidad Proyecto para cada fila.
      proyecto.proyecto = row['proyecto']; //Asigna los valores de las propiedades del objeto proyecto desde las columnas correspondientes de la fila actual.
      proyecto.cliente = row['cliente'];
      proyecto.titulo = row['titulo'];
      proyecto.revision = row['revision'];
      proyecto.tipo = row['tipo'];
      proyecto.elaboradoPor = row['elaboradoPor'];
      await this.proyectosRepository.save(proyecto); //-Guarda la instancia de proyecto en la base de datos usando el repositorio de proyectos. La operación es asíncrona, por lo que utiliza await.
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
      await this.proyectosRepository.clear();
      this.logger.log('All data deleted successfully');
    } catch (error) {
      this.logger.error('Error deleting data', error.stack);
      throw error;
    }
  }
}
