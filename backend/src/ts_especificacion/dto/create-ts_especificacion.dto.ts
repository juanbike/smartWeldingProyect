/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTsEspecificacionDto {
    @IsNotEmpty({ message: 'El campo "Especificación" no puede estar vacío' })
    @IsString({ message: 'El campo "Especificación" debe ser una cadena de texto' })
    tipoMaterial: string;

    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })    
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;
}

