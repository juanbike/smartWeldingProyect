/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Junta } from '../../juntas/entities/junta.entity';

  import {
    IsNotEmpty,
    IsString,
    
  } from 'class-validator';
  @Entity({name: 'TsNominal1'})
export class TsN1 {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'El campo "N1" no puede estar vacío' })
    @IsString({ message: 'El campo "N1" debe ser una cadena de texto' })
    @Column({ name: 'nominal1', length: 10, nullable: false })
    n1: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;
    //un n1 tiene muchas juntas
    @OneToMany(() => Junta, (junta) => junta.tsN1ID)
  juntas: Junta[];

}
