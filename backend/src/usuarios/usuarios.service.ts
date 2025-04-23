/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UserType } from 'src/user-type/entities/user-type.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}



 /* Crear un nuevo usuario
 async create(userTypeId: number,userData: Partial<Usuario> ): Promise<Usuario> {
  const userType = await this.userTypeRepository.findOne({ where: { id: userTypeId } });
  if (!userType) {
    throw new Error('Tipo de usuario no encontrado');
  }
  const newUser = this.usuarioRepository.create({ ...userData, userType });
  return this.usuarioRepository.save(newUser);
}

*/
async create(userData: CreateUsuarioDto): Promise<Usuario> {
  const hashedPassword = await bcrypt.hash(userData.password, 10); // Cifra la contraseña
  const newUser = this.usuarioRepository.create({ ...userData, password: hashedPassword });
  return this.usuarioRepository.save(newUser);
}




  //Encontramos todos los usuarios

  // Obtener todos los usuarios con su tipo de usuario
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['userType'] });
  }

  //Recuperamos el usuario por id

async findById(id: number): Promise<Usuario> {
  const usuario = await this.usuarioRepository.findOneBy({id:id});

  if (!usuario) {
    throw new NotFoundException(`El usuario con el ID ${id} no se encuentra`);
  }

  return usuario;
}



// Actualizar un usuario
async update(id: number, userData: Partial<Usuario>): Promise<Usuario> {
  await this.usuarioRepository.update(id, userData);
  return this.usuarioRepository.findOne({ where: { id }, relations: ['userType'] });
}

 
  // Eliminar un usuario
  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  // Validar usuario
  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Las credenciales son válidas
    }
    return null; // Credenciales inválidas
  }
}
