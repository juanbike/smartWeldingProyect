/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name:'juntas' })
export class Junta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nominal', length: 5, nullable: false })
  nominal: string;

  @Column({ name: 'nominal1', length: 5, nullable: false })
  nominal1: string;
 
  @Column({ name: 'linea', length: 150, nullable: false })
  linea: string;

  @Column({ name: 'especificacion', length: 10, nullable: false })
  especificacion: string;


  @Column({ name: 'schedule', length: 10, nullable: false })
  schedule: string;

  @Column({ name: 'tipo_extremos', length: 12, nullable: false })
  tipo_extremos: string;

  @Column({ name: 'tipo_material', length: 15, nullable: false })
  tipo_material: string;

  @Column({ name: 'material', length: 30, nullable: false })
  material: string;


  @Column({ name: 'diam_inch_contabilizadas', length: 150, nullable: false })
  diam_inch_contabilizadas: string;

  @Column({ name: 'factor_pulgadas_diametrales', length: 10, nullable: false })
  factor_pulgadas_diametrales: string;

  @Column({ name: ' pulgadas_diametrales', length: 10, nullable: false })
  pulgadas_diametrales: string;
 
  @Column({ name: '  proyectID', length: 10, nullable: false })
  proyectID: string;

  @Column({ name: '  usuarioID', length: 10, nullable: false })
  usuarioID: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

}
