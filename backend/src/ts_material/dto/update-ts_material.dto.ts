/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsMaterialDto } from './create-ts_material.dto';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateTsMaterialDto extends PartialType(CreateTsMaterialDto) {
    @IsNotEmpty()
    @IsString()
    linea: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
