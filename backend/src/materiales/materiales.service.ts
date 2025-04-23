/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialeDto } from './dto/create-materiale.dto';

import { Materiales } from './entities/materiale.entity';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MaterialesService {
  private readonly logger = new Logger(Materiales.name);


  constructor(
    @InjectRepository(Materiales)
    private readonly materialesRepository: Repository<Materiales>,
  ) {}

  //Creamos un registro de material

  async create(createMaterialeDto: CreateMaterialeDto): Promise<Materiales> {
    const nuevoMaterial = new Materiales();
      nuevoMaterial.tipo = createMaterialeDto.tipo;
      nuevoMaterial.colada = createMaterialeDto.colada;
      nuevoMaterial.schedule = createMaterialeDto.schedule;
      nuevoMaterial.textremo = createMaterialeDto.textremo;
      nuevoMaterial.tmaterial = createMaterialeDto.tmaterial;
      nuevoMaterial.material = createMaterialeDto.material
 
    return await this.materialesRepository.save(nuevoMaterial);
  }


  //Recuperamos todos los materiales
  async findAll(): Promise<Materiales[]> {
    return await this.materialesRepository.find();
  }

  //Recupermos un registro de material
  async findById(id: number) {
    const material = await this.materialesRepository.findOneBy({id:id})
    if(!material){
      throw new NotFoundException(`El material con el ID ${id} no se encuentra`)
    }
    return material;
  }


      // Actualiza los campos del usuario con los datos proporcionados

      async update(id: number,  UpdateMaterialDto: Partial<Materiales>): Promise<Materiales> {
        const material = await this.materialesRepository.findOneBy({id: id})
      
        if (!material) {
          throw new NotFoundException(`El material con el ID ${id} no se encuentra`);
        }
      
        // Actualiza los campos del usuario con los datos proporcionados
        this.materialesRepository.merge(material, UpdateMaterialDto);
      
        return this.materialesRepository.save(material);
      }
    


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
          const materiales = new Materiales(); 
          materiales.tipo = row['tipo'];
          materiales.colada = row['colada'];
          materiales.schedule = row['schedule'];
          materiales.textremo = row['textremo'];
          materiales.tmaterial = row['tmaterial'];
          materiales.material = row['material'];
          await this.materialesRepository.save(materiales);
          this.logger.log('Guardando fila:'+ row['tipo'] + ' -'+ row['colada'] + ' -'+ row['schedule'] + ' -'+ row['textremo'] + ' -'+ row['tmaterial'] + ' -'+ row['material']);
        }
        // Eliminar el archivo después de procesarlo
        fs.unlinkSync(resolvedPath); //-7
      }






  // Eliminar un MATERIAL por su Id

  async remove(id: number): Promise<void> {
    const material = await this.materialesRepository.findOneBy({id: id});
  
    if (!material) {
      throw new NotFoundException(`El soldador con el ID ${id} no se encuentra`);
     }
  
    await this.materialesRepository.remove(material);
  }

  
  //Elimina todos los soldadores
  async deleteAllMateriales(): Promise<void> {
    await this.materialesRepository.delete({});
  }


}
