/* eslint-disable prettier/prettier */
import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El campo Nombre no puede estar vacio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El campo Apeliido no puede estar vacio' })
  @IsString()
  apellido: string;
 
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsInt({ message: 'El ID del tipo de usuario debe ser un número entero' })
  userTypeId: number;

  
}
