/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsLineaDto } from './create-ts_linea.dto';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateTsLineaDto extends PartialType(CreateTsLineaDto) {
    @IsNotEmpty()
    @IsString()
    linea: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
