/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../entities/user-type.entity';

@Injectable()
export class UserTypeService {
  // El constructor recibe una instancia de Repository para interactuar con la base de datos
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  // La función seedUserTypes se encarga de insertar datos de ejemplo en la base de datos para la entidad UserType.
  async seedUserTypes() {
    const userTypes = [
      {  name: 'Administrador', description: 'Usuario con permisos totales' },
      {
        name: 'Gerente',
        description: 'Supervisar el progreso del proyecto y el equipo',
      },
      { name: 'Soldador', description: 'Acceso limitado a las juntas asignadas' },
      { name: 'Inspector', description: 'Acceso a las juntas asignadas para realizar inspecciones' },
      { name: 'Operador', description: 'Acceso a las juntas, materiales,asignadas para realizar operaciones de mantenimiento ' },
    ];

    // Use the injected repository instance
    for (const userType of userTypes) {
      const existingUserType = await this.userTypeRepository.findOne({
        where: { name: userType.name },
      });
      if (!existingUserType) {
        await this.userTypeRepository.save(
          this.userTypeRepository.create(userType),
        );
      }
    }
  }
}
