import { IsOptional, IsString, Length } from "class-validator";

export class CreateUserTypeDto {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}

//Para separar la lógica de negocio de la capa de persistencia, puedes crear DTOs (Data Transfer Objects) que 
// definan la estructura de los datos que se reciben o envían desde/hacia la base de datos. Esto mejora la 
// modularidad y facilita las pruebas.