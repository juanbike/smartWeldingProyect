import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Crear un nuevo usuario
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUsuarioDto): Promise<any> {
    return this.usuariosService.create(createUserDto);
  }

  // Obtener todos los usuarios con sus tipos de usuario
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  //Recuperamos un usuario pos su id

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findById(+id);
  }

  // Actualizar un usuario
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUsuarioDto,
  ): Promise<any> {
    return this.usuariosService.update(id, updateUserDto);
  }

  // Eliminar un usuario
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuariosService.delete(id);
  }

  //validar usuario emial y password
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Define el cuerpo de la solicitud
    return this.usuariosService.validateUser(loginDto.email, loginDto.password); // Llama al servicio para validar el usuario
  }
}
