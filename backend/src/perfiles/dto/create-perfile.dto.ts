/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty,  IsString,  } from 'class-validator';
export class CreatePerfileDto {
    
    @IsEmail({}, { message: 'El correo electrónico proporcionado no es válido.' })
    email: string;
  
    
    @IsNotEmpty({ message: 'El campo Telefono no puede estar vacio' })
    @IsString()
    telefono: string;

    @IsNotEmpty({ message: 'El campo Nombre no puede estar vacio' })
    @IsString()
    rol: string;
    

    @IsNotEmpty({ message: 'El campo Password no puede estar vacio' })
    @IsString()
    password: string;

   
}
