/* eslint-disable prettier/prettier */
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Junta } from '../../juntas/entities/junta.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToMany, 
 OneToMany
} from 'typeorm';

@Entity({ name: 'inspectores' })
export class Inspector {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', length: 25, nullable: false })
  nombre: string;

  @Column({ name: 'apellido', length: 25, nullable: false })
  apellido: string;
  
  @Column({ name: 'telefono1', length: 25, nullable: false })
  telefono1: string;

  @Column({ name: 'telefono2', length: 25, nullable: false })
  telefono2: string;

  
  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;


  //Relaciones Muchos a Muchos: Un inspector puede estar en muchos proyectos
  
  @ManyToMany(() => Proyecto, proyecto => proyecto.inspectores)
  
  proyectos: Proyecto[];
  
  @OneToMany(() => Junta, junta => junta.inspectorID)
  juntas: Junta[];
  

}
