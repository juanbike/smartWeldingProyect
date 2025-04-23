/* eslint-disable prettier/prettier */
import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';


export class CreateJuntaDto {
  

  @IsInt({ message: 'inspectorID debe ser un número entero' })
  inspectorID: number;

  @IsInt({ message: 'soldadorId debe ser un número entero' })
  soldadorID: number;

  @IsInt({ message: 'lineaID debe ser un número entero' })
  lineaID: number;

  @IsInt({ message: 'especificacionID debe ser un número entero' })
  especificacionID: number;

  @IsDateString(
    {},
    {
      message:
        'fecha debe ser una cadena de fecha ISO 8601 válida:ejemplo:2023-06-24T10:00:00Z',
    },
  )
  fecha: string;

  @IsString()
  observaciones: string;

 
  @IsNumber({}, { message: 'El número de proyecto debe ser un  número entero' })
  proyectoID: number;

  @IsInt({ message: 'ScheduleID debe ser un número entero' })
  tsScheduleID: number;

  @IsInt({ message: 'El tipo extremo debe ser un número entero' })
  tsTipoExtremoID: number;

  @IsInt({ message: 'El ID del material debe ser un número entero' })
  tsMaterialID: number;

  @IsInt({ message: 'El ID del tipo de material debe ser un número entero' })
  tsTipoMaterialID: number;

  @IsInt({ message: 'El ID de Nominal1 debe ser un número entero' })
  tsN1ID: number;

  @IsInt({ message: 'El ID de Nominal0 debe ser un número entero' })
  tsN0ID: number;

  @IsNumber({}, { message: 'Las Pulagadas Contabilizadas debe ser un  número entero o Decimal' })
  pulgadascon: number;

  @IsNumber({}, { message: 'El Factor Pulagadas Diametrales debe ser un  número entero o Decimal' })
  facpuldia: number;

  @IsNumber({}, { message: 'Las Pulagadas Diametrales debe ser un  número entero o Decimal' }) 
  pulgdia: number;


  
}
