import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

import { CreatePerfileDto } from './create-perfile.dto';

export class UpdatePerfileDto extends PartialType(CreatePerfileDto) {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
