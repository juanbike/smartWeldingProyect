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
  @Entity({name: 'Material'})

export class TsMaterial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    @Column({ length: 30 })
    @IsNotEmpty({ message: 'El campo "Material" no puede estar vacío' })
    @IsString({ message: 'El campo "Material" debe ser una cadena de texto' })
    material: string;
  
    @Column('text', { nullable: true })
    @Column({ length: 30 })
    @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
    @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
    tipo: string;

    
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Un Material tiene muchas juntas
  @OneToMany(() => Junta, (junta) => junta.tsMaterialID)
  juntas: Junta[];
}
