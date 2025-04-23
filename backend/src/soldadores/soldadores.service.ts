/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoldadoreDto } from './dto/create-soldadore.dto';
import { UpdateSoldadoreDto } from './dto/update-soldadore.dto';
import { Soldadore } from './entities/soldadore.entity';



@Injectable()
export class SoldadoresService {
  constructor(
    @InjectRepository(Soldadore)
    private readonly soldadoresRepository: Repository<Soldadore>,
  ) {}


  //Creamos un soldador


  async create(createSoldadoreDto: CreateSoldadoreDto): Promise<Soldadore> {
    const nuevoSoldador = new Soldadore();
    nuevoSoldador.nombre = createSoldadoreDto.nombre;
    nuevoSoldador.apellido=  createSoldadoreDto.apellido;
    nuevoSoldador.identificacion = createSoldadoreDto.identificacion;
    nuevoSoldador.valores = createSoldadoreDto.valores;
    nuevoSoldador.estampa = createSoldadoreDto.estampa;
    nuevoSoldador.calificacion = createSoldadoreDto.calificacion;
    nuevoSoldador.basemetal = createSoldadoreDto.basemetal;
    nuevoSoldador.numerop = createSoldadoreDto.numerop;
    nuevoSoldador.email = createSoldadoreDto.email;
    nuevoSoldador.telefono = createSoldadoreDto.telefono;

    return await this.soldadoresRepository.save(nuevoSoldador);
  }


  //Encontramos todos los soldadores
  async findAll(): Promise<Soldadore[]> {
    return await this.soldadoresRepository.find();
  }


  //Recuperamos el soldador por id
  async findById(id: number): Promise<Soldadore> {
    const inspector = await this.soldadoresRepository.findOneBy({id:id});
  
    if (!inspector) {
      throw new NotFoundException(`El soldador con el ID ${id} no se encuentra`);
    }
  
    return inspector;
  }


  //Actualizamos un soldador por su ID
  async update(id: number,  UpdateSoldadoreDto: Partial<Soldadore>): Promise<Soldadore> {
    const soldador = await this.soldadoresRepository.findOneBy({id: id})
  
    if (!soldador) {
      throw new NotFoundException(`El soldador con el ID ${id} no se encuentra`);
    }
  
    // Actualiza los campos del usuario con los datos proporcionados
    this.soldadoresRepository.merge(soldador, UpdateSoldadoreDto);
  
    return this.soldadoresRepository.save(soldador);
  }

  // Eliminar un soldador por su Id

  async remove(id: number): Promise<void> {
    const soldador = await this.soldadoresRepository.findOneBy({id: id});
  
    if (!soldador) {
      throw new NotFoundException(`El soldador con el ID ${id} no se encuentra`);
     }
  
    await this.soldadoresRepository.remove(soldador);
  }

  //Elimina todos los soldadores
  async deleteAllSoldadores(): Promise<void> {
    await this.soldadoresRepository.delete({});
  }

}
