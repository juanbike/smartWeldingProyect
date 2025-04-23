/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTsScheduleDto {
    @IsNotEmpty({ message: 'El campo "Schedule" no puede estar vacío' })
    @IsString({ message: 'El campo "Schedule" debe ser una cadena de texto' })
    schedule: string;

    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })    
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;
}
