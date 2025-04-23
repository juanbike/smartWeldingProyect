/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  import {
    IsNotEmpty,
    IsString,
    
  } from 'class-validator';
  @Entity({name: 'schedule'})

export class TsSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    @Column({ length: 20 })
    @IsNotEmpty({ message: 'El campo "Schedule" no puede estar vacío' })
    @IsString({ message: 'El campo "Schedule" debe ser una cadena de texto' })
    schedule: string;
  
    @Column('text', { nullable: true })
    @Column({ length: 30 })
    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;

    
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
