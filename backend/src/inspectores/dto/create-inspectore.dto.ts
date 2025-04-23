/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateInspectoreDto {
  
  @IsNotEmpty({ message: 'El campo Nombre no puede estar vacio' })
  @IsString()
  nombre: string;

  
  @IsNotEmpty({ message: 'El campo Apellido no puede estar vacio' })
  @IsString()
  apellido: string;

  
  @IsNotEmpty({ message: 'El campo Telefono1 no puede estar vacio' })
  @IsString()
  telefono1: string;

  
  
 @IsOptional()
  telefono2?: string;


}
