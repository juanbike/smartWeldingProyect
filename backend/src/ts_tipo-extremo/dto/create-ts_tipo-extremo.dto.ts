/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTsTipoExtremoDto {
    @IsNotEmpty({ message: 'El campo "Tipo Extremo" no puede estar vacío' })
    @IsString({ message: 'El campo "Tipo Extremo" debe ser una cadena de texto' })
    tipoExtremo: string;

    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })    
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;
}
