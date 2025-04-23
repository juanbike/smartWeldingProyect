/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProyectoDto {
  @IsNotEmpty({ message: 'El campo "nombreProyecto" no puede estar vacío' })
  @IsString({
    message: 'El campo "nombreProyecto" debe ser una cadena de texto',
  })
  proyecto: string;

  @IsNotEmpty({ message: 'El campo "cliente" no puede estar vacío' })
  @IsString({ message: 'El campo "cliente" debe ser una cadena de texto' })
  cliente: string;

  @IsNotEmpty({ message: 'El campo "titulo" no puede estar vacío' })
  @IsString({ message: 'El campo "titulo" debe ser una cadena de texto' })
  titulo: string;

  @IsNotEmpty({ message: 'El campo "revision" no puede estar vacío' })
  @IsString({ message: 'El campo "revision" debe ser una cadena de texto' })
  revision: string;

  @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
  @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
  tipo: string;

  @IsNotEmpty({ message: 'El campo "elaboradoPor" no puede estar vacío' })
  @IsString({ message: 'El campo "elaboradoPor" debe ser una cadena de texto' })
  elaboradoPor: string;
}
