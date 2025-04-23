import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

import { Usuario } from '../usuarios/entities/usuario.entity';

import { UserType } from 'src/user-type/entities/user-type.entity';
import { UserTypeService } from 'src/user-type/user-type.service';  
import { UserTypeController } from 'src/user-type/user-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, UserType])],
  controllers: [UsuariosController, UserTypeController],
  providers: [UsuariosService, UserTypeService],
})
export class UsuariosModule {}
