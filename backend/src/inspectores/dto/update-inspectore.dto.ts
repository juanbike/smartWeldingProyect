/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInspectoreDto } from './create-inspectore.dto';

import { IsNotEmpty, IsOptional, IsString} from 'class-validator';
export class updateInspectoreDto extends PartialType(CreateInspectoreDto) {
     
  @IsNotEmpty()
  @IsString()
  nombre: string;

  
  @IsNotEmpty({ message: 'El campo Apellido no puede estar vacio' })
  @IsString()
  apellido: string;

  
  @IsNotEmpty({ message: 'El campoTelefono no puede estar vacio' })
  @IsString()
 telefono1: string;

  
  @IsOptional()
  @IsString()
   telefono2?: string;

}
