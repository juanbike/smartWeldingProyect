/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTsLineaDto {
    @IsNotEmpty({ message: 'El campo "Linea" no puede estar vacío' })
    @IsString({ message: 'El campo "Linea" debe ser una cadena de texto' })
    linea: string;

    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })    
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;
}
