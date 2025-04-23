/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSoldaduraDto {
    @IsNotEmpty({ message: 'El campo  NRO_JUNTA no puede estar vacio' })
    @IsString()
    nro_junta: string;
  
    @IsNotEmpty({ message: 'El campo TIPO no puede estar vacio' })
    @IsString()
    tipo: string;
  
    
    @IsNotEmpty({ message: 'El campo  PLANO no puede estar vacio' })
    @IsString()
    plano: string;
  
    @IsNotEmpty({ message: 'El campo  HOJA no puede estar vacio' })
    @IsString()
    hoja: string;
  
    @IsNotEmpty({ message: 'El campo REVISION   no puede estar vacio' })
    @IsString()
    revision: string;
   
    @IsNotEmpty({ message: 'El campo AREA no puede estar vacio' })
    @IsString()
    area: string;
  
   
    @IsNotEmpty({ message: 'El campo  FASE no puede estar vacio' })
    @IsString()
    fase: string;
  
    @IsNotEmpty({ message: 'El campo  LINEA no puede estar vacio' })
    @IsString()
    linea: string;
  
    @IsNotEmpty({ message: 'El campo DIAMETRO no puede estar vacio' })
    @IsString()
    diametro: string;
  
    @IsNotEmpty({ message: 'El campo  ESPESOR no puede estar vacio' })
    @IsString()
    espesor: string;
  
    @IsNotEmpty({ message: 'El campo  CEDULA no puede estar vacio' })
    @IsString()
    cedula: string;
  
    @IsNotEmpty({ message: 'El campo PN1 no puede estar vacio' })
    @IsString()
    pn1: string;

    
    @IsNotEmpty({ message: 'El campo PN2 no puede estar vacio' })
    @IsString()
    pn2: string;
    
    @IsNotEmpty({ message: 'El campo  WDS no puede estar vacio' })
    @IsString()
    wps: string;

  
  
}