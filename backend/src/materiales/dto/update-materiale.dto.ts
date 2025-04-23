/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialeDto } from './create-materiale.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMaterialeDto extends PartialType(CreateMaterialeDto) {
  @IsNotEmpty({ message: 'El campo Tipo no puede estar vacio' })
  @IsString()
  tipo: string;

  @IsNotEmpty({ message: 'El campo Colada no puede estar vacio' })
  @IsString()
  colada: string;

  @IsNotEmpty({ message: 'El campo schedule no puede estar vacio' })
  @IsString()
  schedule: string;

  @IsNotEmpty({ message: 'El campo textremo no puede estar vacio' })
  @IsString()
  textremo: string;

  @IsNotEmpty({ message: 'El campo tmaterial no puede estar vacio' })
  @IsString()
  tmaterial: string;

  @IsNotEmpty({ message: 'El campo material no puede estar vacio' })
  @IsString()
  material: string;
}
