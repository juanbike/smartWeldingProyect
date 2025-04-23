/* eslint-disable prettier/prettier */
import { Junta } from 'src/juntas/entities/junta.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity({ name:'soldadores' })
export class Soldadore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', length: 25, nullable: false })
  nombre: string;


  @Column({ name: 'apellido', length: 25, nullable: false })
  apellido: string;

  @Column({ name: 'identificacion', length: 18, nullable: false })
  identificacion: string;

  @Column({ name: 'valores', length: 20, nullable: false })
  valores: string;


  @Column({ name: 'estampa', length: 20, nullable: false })
  estampa: string;

  @Column({ name: 'calificacion', length: 25, nullable: false })
  calificacion: string;

  @Column({ name: 'basemetal', length: 20, nullable: false })
  basemetal: string;

  @Column({ name: 'numerop', length: 25, nullable: false })
  numerop: string;

  @Column({ name: 'telefono', length: 25, nullable: false })
  telefono: string;
  
  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => Junta, junta => junta.soldadorID)
  juntas: Junta[];

}
