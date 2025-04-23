/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTsMaterialDto {
    @IsNotEmpty({ message: 'El campo "Material" no puede estar vacío' })
    @IsString({ message: 'El campo "Material" debe ser una cadena de texto' })
    material: string;

    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })    
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;
}
