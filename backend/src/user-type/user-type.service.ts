import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserType } from './entities/user-type.entity';
//import { UpdateUserTypeDto } from './dto/update-user-type.dto';

//El servicio se encargará de interactuar con la base de datos para gestionar los tipos de usuario.
@Injectable()
export class UserTypeService {
  // Create a new userType and return the created userType
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  // Crear un nuevo tipo de usuario
  async create(userTypeData: Partial<UserType>): Promise<UserType> {
    const newUserType = this.userTypeRepository.create(userTypeData);
    return this.userTypeRepository.save(newUserType);
  }

  // Eliminar un tipo de usuario
  async delete(id: number): Promise<void> {
    await this.userTypeRepository.delete(id);
  }

  // Actualizar un tipo de usuario
  async update(id: number, userTypeData: Partial<UserType>): Promise<UserType> {
    await this.userTypeRepository.update(id, userTypeData);
    return this.userTypeRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  // Obtener todos los tipos de usuario con sus usuarios asociados
  async findAll(): Promise<UserType[]> {
    return this.userTypeRepository.find({ relations: ['users'] });
  }

  // Find a userType by ID and return it
  async findOne(id: number) {
    return this.userTypeRepository.findOne({ where: { id } });
  }
}
