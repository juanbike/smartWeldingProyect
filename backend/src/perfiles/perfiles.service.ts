import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePerfileDto } from './dto/create-perfile.dto';
import { UpdatePerfileDto } from './dto/update-perfile.dto';

import { Perfile } from './entities/perfile.entity';

@Injectable()
export class PerfilesService {
  constructor(
    @InjectRepository(Perfile)
    private readonly perfilRepository: Repository<Perfile>,
  ) {}

  //Creamos un Perfil

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createPerfilDto: CreatePerfileDto): Promise<Perfile> {
    const nuevoPerfil = new Perfile();
    nuevoPerfil.correo = nuevoPerfil.correo;
    nuevoPerfil.telefono = nuevoPerfil.telefono;
    nuevoPerfil.rol = nuevoPerfil.rol;
    nuevoPerfil.password = nuevoPerfil.password;

    return await this.perfilRepository.save(nuevoPerfil);
  }

  //Encontramos todos los inpectores

  async findAll(): Promise<Perfile[]> {
    return await this.perfilRepository.find();
  }

  //Recuperamos el inpector por id

  async findById(id: number): Promise<Perfile> {
    const perfil = await this.perfilRepository.findOneBy({ id: id });

    if (!perfil) {
      throw new NotFoundException(`El perfil con el ID ${id} no se encuentra`);
    }

    return perfil;
  }

  // Actualizar inspector

  async update(
    id: number,
    UpdatePerfileDto: Partial<Perfile>,
  ): Promise<Perfile> {
    const perfil = await this.perfilRepository.findOneBy({ id: id });

    if (!perfil) {
      throw new NotFoundException(`El perfil con el ID ${id} no se encuentra`);
    }

    // Actualiza los campos del usuario con los datos proporcionados
    this.perfilRepository.merge(perfil, UpdatePerfileDto);

    return this.perfilRepository.save(perfil);
  }

  //Elimina todas las juntas
  async remove(id: number): Promise<void> {
    const perfil = await this.perfilRepository.findOneBy({ id: id });

    if (!perfil) {
      throw new NotFoundException(`El perfil con el ID ${id} no se encuentra`);
    }

    await this.perfilRepository.remove(perfil);
  }
}
