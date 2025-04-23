/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Junta } from '../../juntas/entities/junta.entity';

import { IsNotEmpty, IsString } from 'class-validator';
@Entity({ name: 'tipoExtremo' })
export class TsTipoExtremo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  @Column({ length: 30 })
  @IsNotEmpty({ message: 'El campo "Tipo Extremo" no puede estar vacío' })
  @IsString({ message: 'El campo "tipo Extremo" debe ser una cadena de texto' })
  tipoExtremo: string;

  @Column('text', { nullable: true })
  @Column({ length: 30 })
  @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
  @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
  tipo: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Un tipoExtremo tiene muchas juntas
  @OneToMany(() => Junta, (junta) => junta.tsTipoExtremoID)
  juntas: Junta[];
}
