/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
   OneToMany,
  } from 'typeorm';
 import { Junta } from '../../juntas/entities/junta.entity';

  import {
    IsNotEmpty,
    IsString,
    
  } from 'class-validator';
  @Entity({name: 'TsNominal0'})
export class TsN0 {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'El campo "N0" no puede estar vacío' })
    @IsString({ message: 'El campo "N0" debe ser una cadena de texto' })
    @Column({ name: 'nominal0', length: 10, nullable: false })
    n0: string;

   //un n0 tiene muchas juntas
   @OneToMany(() => Junta, (junta) => junta.tsN0ID)
   juntas: Junta[];
 


}
