import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { UserType } from './entities/user-type.entity';
//import { CreateUserTypeDto } from './dto/create-user-type.dto';
//import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Controller('user-type')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  // Crear un nuevo tipo de usuario
  @Post()
  async create(@Body() userTypeData: Partial<UserType>): Promise<UserType> {
    return this.userTypeService.create(userTypeData);
  }

  // Obtener todos los tipos de usuario con sus usuarios asociados
  @Get()
  async findAll(): Promise<UserType[]> {
    return this.userTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTypeService.findOne(+id);
  }

  // Actualizar un tipo de usuario
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userTypeData: Partial<UserType>,
  ): Promise<UserType> {
    return this.userTypeService.update(id, userTypeData);
  }

  // Eliminar un tipo de usuario
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userTypeService.delete(id);
  }
}
