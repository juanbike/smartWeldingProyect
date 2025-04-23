/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTsTipoExtremoDto } from './create-ts_tipo-extremo.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTsTipoExtremoDto extends PartialType(CreateTsTipoExtremoDto) {
    @IsNotEmpty()
    @IsString()
    tipoExtremo: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;
}
