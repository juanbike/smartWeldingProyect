/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Junta } from '../../juntas/entities/junta.entity';
@Entity({ name: 'Linea' })
export class TsLinea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  @Column({ length: 80 })
  @IsNotEmpty({ message: 'El campo "Linea" no puede estar vacío' })
  @IsString({ message: 'El campo "Linea" debe ser una cadena de texto' })
  linea: string;

  @Column('text', { nullable: true })
  @Column({ length: 30 })
  @IsNotEmpty({ message: 'El campo "tipo" no puede estar vacío' })
  @IsString({ message: 'El campo "tipo" debe ser una cadena de texto' })
  tipo: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Una linea tiene muchas juntas
  @OneToMany(() => Junta, (junta) => junta.lineaID)
  juntas: Junta[];
}
