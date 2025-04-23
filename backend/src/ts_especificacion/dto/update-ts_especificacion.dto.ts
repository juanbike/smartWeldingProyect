/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsEspecificacionDto } from './create-ts_especificacion.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTsEspecificacionDto extends PartialType(CreateTsEspecificacionDto) {
    @IsNotEmpty()
    @IsString()
    especificacion: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
