import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsInt, IsOptional, MinLength } from 'class-validator';
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  nombre?: string;

  @IsOptional()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsInt()
  userTypeId?: number;
}
