/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsTipoMaterialDto } from './create-ts_tipo-material.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateTsTipoMaterialDto extends PartialType(CreateTsTipoMaterialDto) {
    @IsNotEmpty()
    @IsString()
    tipoMaterial: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
