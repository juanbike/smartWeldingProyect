/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  import {
    IsNotEmpty,
    IsString,
    
  } from 'class-validator';
  import { Junta } from '../../juntas/entities/junta.entity';
  @Entity({name: 'especificacion'})
export class TsEspecificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    @Column({ length: 10 })
    @IsNotEmpty({ message: 'El campo "Especificación" no puede estar vacío' })
    @IsString({ message: 'El campo "Especificación" debe ser una cadena de texto' })
    especificacion: string;
  
    @Column('text', { nullable: true })
    @Column({ length: 30 })
    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;

    
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

   // Una linea tiene muchas juntas
   @OneToMany(() => Junta, junta => junta.lineaID)
   juntas: Junta[];
   
}
