/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInspectoreDto } from './dto/create-inspectore.dto';

import { Inspector } from './entities/inspectore.entity';

@Injectable()
export class InspectoresService {

  constructor(
    @InjectRepository(Inspector)
    private readonly inspectoresRepository: Repository<Inspector>,
  ) {}


  
//Creamos un inspector

async create(createInpectoreDto: CreateInspectoreDto): Promise<Inspector> {
  const nuevoInspector = new Inspector();
  nuevoInspector.nombre = createInpectoreDto.nombre;
  nuevoInspector.apellido=  createInpectoreDto.apellido;
  nuevoInspector.telefono1 = createInpectoreDto.telefono1;
  nuevoInspector.telefono2 =   createInpectoreDto.telefono2 ;

  return await this.inspectoresRepository.save(nuevoInspector);
}


//Encontramos todos los inpectores

async findAll(): Promise<Inspector[]> {
  return await this.inspectoresRepository.find();
}


//Recuperamos el inpector por id

async findById(id: number): Promise<Inspector> {
  const inspector = await this.inspectoresRepository.findOneBy({id:id});

  if (!inspector) {
    throw new NotFoundException(`El inspector con el ID ${id} no se encuentra`);
  }

  return inspector;
}

// Actualizar inspector


async update(id: number,  UpdateInspectoreDto: Partial<Inspector>): Promise<Inspector> {
  const junta = await this.inspectoresRepository.findOneBy({id: id})

  if (!junta) {
    throw new NotFoundException(`El inspector con el ID ${id} no se encuentra`);
  }

  // Actualiza los campos del usuario con los datos proporcionados
  this.inspectoresRepository.merge(junta, UpdateInspectoreDto);

  return this.inspectoresRepository.save(junta);
}



//Eliminar inspector


async remove(id: number): Promise<void> {
  const inspector = await this.inspectoresRepository.findOneBy({id: id});

  if (!inspector) {
    throw new NotFoundException(`El inspector con el ID ${id} no se encuentra`);
   }

  await this.inspectoresRepository.remove(inspector);
}


//Elimina todas las juntas
async deleteAllInspectores(): Promise<void> {
  await this.inspectoresRepository.delete({});
}


}
