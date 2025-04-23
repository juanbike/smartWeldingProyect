/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
@Entity({ name: 'tsMainJunta' })
export class TsMainJunta {
  @PrimaryGeneratedColumn('increment', { name: 'id_junta' })
  id: number;
   
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tipo)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Proyecto;

}
